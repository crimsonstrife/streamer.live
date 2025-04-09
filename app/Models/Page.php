<?php

namespace App\Models;

use App\Utilities\ShopHelper;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Z3d0X\FilamentFabricator\Facades\FilamentFabricator;
use Z3d0X\FilamentFabricator\Models\Page as BasePage;

class Page extends BasePage
{
    public function __construct(array $attributes = [])
    {
        if (blank($this->table)) {
            $this->setTable(config('filament-fabricator.table_name', 'pages'));
        }

        parent::__construct($attributes);
    }

    protected static function booted(): void
    {
        static::saved(function ($page) {
            if ($page->type === 'shop') {
                ShopHelper::clearSlugCache();
            }
        });
    }

    protected $fillable = [
        'title',
        'slug',
        'layout',
        'type',
        'parent_id',
        'blocks',
    ];

    protected $guarded = [];

    protected $casts = [
        'blocks' => 'array',
        'parent_id' => 'integer',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(static::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(static::class, 'parent_id');
    }

    public function allChildren(): HasMany
    {
        return $this->children()
            ->select('id', 'slug', 'title', 'parent_id')
            ->with('allChildren:id,slug,title,parent_id');
    }

    public function getLayoutView(): string
    {
        $layout = $this->layout;

        // If a registered layout exists with a view(), use that:
        $layoutClass = FilamentFabricator::getLayout($layout);

        if ($layoutClass && method_exists($layoutClass, 'view')) {
            return $layoutClass::view();
        }

        // Fallback view path
        return "components.filament-fabricator.layouts.{$layout}";
    }

    public function getLayoutData(): array
    {
        $layout = $this->layout;

        $layoutClass = FilamentFabricator::getLayout($layout);

        if ($layoutClass && method_exists($layoutClass, 'getData')) {
            $layoutData = $layoutClass::getData($this);

            // Merge and log
            $finalData = array_merge($layoutData, ['page' => $this]);

            logger()->debug('Layout data sent to view', $finalData); // <--- Add this

            return $finalData;
        }

        return [
            'page' => $this,
        ];
    }

    public function getLayoutClass(): string
    {
        return FilamentFabricator::getLayouts()[$this->layout] ?? '';
    }
}
