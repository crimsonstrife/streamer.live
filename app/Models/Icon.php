<?php

// app/Models/Icon.php

namespace App\Models;

use App\Services\SvgSanitizerService;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

class Icon extends BaseModel
{
    protected static Filesystem $filesystem;

    public static string $storagePath;

    protected $fillable = [
        'name', 'type', 'style',
        'prefix', 'set', 'class',
        'svg_code', 'svg_file_path', 'is_builtin',
    ];

    protected static array $bladeSets;

    protected static array $prefixMap;

    protected static array $classMap;

    // ——————————————————————————————
    // One-time setup
    // ——————————————————————————————
    protected static function booted(): void
    {
        parent::booted();

        static::$filesystem = new Filesystem;
        static::$storagePath = storage_path('app/public/build/assets/icons');

        static::$bladeSets = Config::get('blade-icons.sets', []);

        static::$prefixMap = array_column(
            array_map(
                fn (array $set, string $key) => ['key' => $key, 'prefix' => $set['prefix'] ?? ''],
                static::$bladeSets,
                array_keys(static::$bladeSets)
            ),
            'prefix', 'key'
        );

        static::$classMap = array_column(
            array_map(
                fn (array $set, string $key) => ['key' => $key, 'class' => $set['class'] ?? ''],
                static::$bladeSets,
                array_keys(static::$bladeSets)
            ),
            'class', 'key'
        );

        // Sanitize on change of svg_code
        static::saving(function (Icon $icon) {
            if ($icon->isDirty('svg_code') && $icon->svg_code) {
                $icon->svg_code = app(SvgSanitizerService::class)
                    ->sanitize($icon->svg_code)
                    ?? throw new RuntimeException('Invalid SVG code.');
            }
        });

        // Clear cache when icons change
        static::saved(fn () => Cache::forget('icons.all'));
        static::deleted(fn () => Cache::forget('icons.all'));
    }

    // ——————————————————————————————
    // File-or-code saving
    // ——————————————————————————————
    public static function saveIconFile(UploadedFile|string $uploaded, string $type, string $style, string $name): string
    {
        $sanitizer = app(SvgSanitizerService::class);
        $dir = static::$storagePath."/custom/{$type}/{$style}";
        $code = is_string($uploaded) ? $uploaded : file_get_contents($uploaded->getRealPath());
        $clean = $sanitizer->sanitize($code)
            ?? throw new RuntimeException('Invalid SVG code.');
        $filename = Str::slug($name).'.svg';
        $unique = self::ensureUniqueFileName($dir, pathinfo($filename, PATHINFO_FILENAME), 'svg');
        Storage::disk('local')->put("{$dir}/{$unique}", $clean);

        return "{$dir}/{$unique}";
    }

    // ——————————————————————————————
    // Cached loaders
    // ——————————————————————————————
    public static function allIcons(): Collection
    {
        return Cache::remember('icons.all', 3600, fn () => static::all());
    }

    public static function types(): Collection
    {
        return Cache::remember('icons.types', 3600, fn () => static::distinct()->pluck('type'));
    }

    public static function styles(): Collection
    {
        return Cache::remember('icons.styles', 3600, fn () => static::distinct()->pluck('style'));
    }

    public static function availableTypes(): array
    {
        $built = array_keys(static::$bladeSets);
        $custom = static::types()
            ->filter(fn ($t) => ! in_array($t, $built))
            ->mapWithKeys(fn ($t) => [$t => Str::title($t)])
            ->toArray();

        return array_merge($custom, ['custom' => 'Custom']);
    }

    public static function prefixMap(): array
    {
        return static::$prefixMap;
    }

    public static function classMap(): array
    {
        return static::$classMap;
    }

    // ——————————————————————————————
    // Accessors
    // ——————————————————————————————
    public function getSvgUrlAttribute(): ?string
    {
        return $this->svg_file_path
            ? Storage::url($this->svg_file_path)
            : null;
    }

    public function getSvgCodeAttribute(): ?string
    {
        return $this->attributes['svg_code'] ?? null;
    }

    // ——————————————————————————————
    // Other helpers (isHeroicon, etc) remain unchanged…
    // ——————————————————————————————
    /**
     * Determine if the icon is a custom uploaded SVG.
     */
    public function isCustom(): bool
    {
        // Custom icons are those that have an SVG file path or inline SVG code, and are not Heroicons or Font Awesome icons.
        // If the result would be null, it will be cast to false always.
        if ($this->svg_file_path || $this->svg_code) {
            return ! $this->isHeroicon() && ! $this->isFontAwesome() && ! $this->isOcticon();
        }

        return false;
    }

    /**
     * Determine if the icon is a Heroicon.
     */
    public function isHeroicon(): bool
    {
        return $this->type === 'heroicon';
    }

    /**
     * Determine if the icon is a Font Awesome icon.
     */
    public function isFontAwesome(): bool
    {
        return $this->type === 'fontawesome';
    }

    /**
     * Determin if the icon is a Octicon.
     */
    public function isOcticon(): bool
    {
        return $this->type === 'octicons';
    }

    /**
     * Get if the icon is built-in or user-uploaded.
     */
    public function isBuiltIn(): bool
    {
        // if the icon is built-in, it will have a value of true, otherwise false. If the value is null, it will be cast to false.
        $isBuiltIn = $this->is_builtin;

        if ($isBuiltIn === null) {
            return false;
        }

        return $isBuiltIn;
    }
}
