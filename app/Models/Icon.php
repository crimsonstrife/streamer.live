<?php

// app/Models/Icon.php

namespace App\Models;

use App\Services\SvgSanitizerService;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
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

    protected $appends = [
        'svg_url',
        'svg_file_code',
        'blade_code',
        'preview',
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
            ->filter(fn ($t) => ! in_array($t, $built, true))
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

    public static function bladeCode($id): string
    {
        $icon = self::find($id);

        if (! $icon) {
            return '';
        }

        if (! empty($icon->prefix) && ! empty($icon->name)) {
            return $icon->prefix.'-'.$icon->name;
        }

        return '';
    }

    // ——————————————————————————————
    // Accessors
    // ——————————————————————————————
    public function getSvgUrlAttribute(): ?string
    {
        if (! $this->svg_file_path) {
            return null;
        }

        // strip the leading "public/" if it’s there:
        $webPath = preg_replace('#^public/#', '', $this->svg_file_path);

        return asset($webPath);
    }

    /**
     * Read raw SVG markup from disk, for file-based icons.
     */
    public function getSvgFileCodeAttribute(): ?string
    {
        if (! $this->svg_file_path) {
            return null;
        }

        // Strip leading "public/" if stored there
        $relative = ltrim(preg_replace('#^public/#', '', $this->svg_file_path), '/');

        // Resolve to the public/ folder
        $fullPath = public_path($relative);

        if (File::exists($fullPath)) {
            return file_get_contents($fullPath);
        }

        return null;
    }

    /**
     * Override the SVG code accessor so that:
     * 1) DB-stored code (user-entered) takes priority
     * 2) Otherwise we fall back to reading the file’s contents
     */
    public function getSvgCodeAttribute(): ?string
    {
        // 1) If inline code was saved in the DB, return it
        if (! empty($this->attributes['svg_code'])) {
            return $this->attributes['svg_code'];
        }

        // 2) Otherwise pull it from the file
        return $this->svg_file_code;
    }

    public function getPreviewAttribute(): string
    {
        // prefer the URL, fall back to inline code
        if ($this->svg_url) {
            return $this->svg_file_code;
        }

        if ($this->svg_code) {
            return $this->svg_code;
        }

        return 'No icon';
    }

    public function getBladeCodeAttribute(): ?string
    {
        if (! empty($this->attributes['prefix']) && ! empty($this->attributes['name'])) {
            return $this->attributes['prefix'].'-'.$this->attributes['name'];
        }

        return null;
    }

    /**
     * The Blade UI component invocation for this icon,
     * e.g. `<x-heroicon-o-information-circle class="w-6 h-6" />`.
     */
    public function getBladeSnippetAttribute(): string
    {
        // assumes the record already has a blade_code property like "heroicon-o-information-circle"
        return "<x-{$this->blade_code}/>";
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
