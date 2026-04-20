<?php

namespace App\Models;

use App\Traits\IsPermissible;
use App\Utilities\ShopHelper;
use Indra\Revisor\Concerns\HasRevisor;
use Indra\Revisor\Contracts\HasRevisor as HasRevisorContract;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Spatie\Tags\HasTags;
use Z3d0X\FilamentFabricator\Facades\FilamentFabricator;
use Z3d0X\FilamentFabricator\Models\Page as BasePage;

class Page extends BasePage implements HasRevisorContract, Searchable
{
    use HasRevisor;
    use HasTags;
    use IsPermissible;

    public function __construct(array $attributes = [])
    {
        if (blank($this->table)) {
            $this->setTable(config('filament-fabricator.table_name', 'pages'));
        }

        parent::__construct($attributes);
    }

    public function getBaseTable(): string
    {
        return config('filament-fabricator.table_name', 'pages');
    }

    protected static function booted(): void
    {
        static::saved(static function ($page) {
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
        'seo_title',
        'seo_description',
        'custom_css',
        'custom_head_html',
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
            return array_merge($layoutData, ['page' => $this]);
        }

        return [
            'page' => $this,
        ];
    }

    public function getLayoutClass(): string
    {
        return FilamentFabricator::getLayouts()[$this->layout] ?? '';
    }

    public static function getHeaderVariant(): ?string
    {
        return null;
    }

    public static function getFooterVariant(): ?string
    {
        return null;
    }

    public function getSearchResult(): SearchResult
    {
        $url = route('fabricator.page.global.fallback', $this->slug);

        return new SearchResult(
            $this,
            $this->title,
            $url
        );
    }
}
