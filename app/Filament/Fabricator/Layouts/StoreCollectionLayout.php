<?php

namespace App\Filament\Fabricator\Layouts;

use App\Models\StoreObjects\Collection;
use App\Models\Page;
use App\Utilities\ShopHelper;
use Z3d0X\FilamentFabricator\Layouts\Layout;

class StoreCollectionLayout extends Layout
{
    protected static ?string $name = 'store-collection';

    public static function shouldRenderPage(Page $page): bool
    {
        $collectionSlug = ShopHelper::getCollectionSlug();

        // Ensure the page is a child of 'shop' and matches collection route
        return str($page->slug)->startsWith(optional($page->parent)->slug.'/'.$collectionSlug.'/');
    }

    public static function getData(Page $page, array $context = []): array
    {
        $collectionSlug = $context['slug'] ?? null;

        if (! $collectionSlug) {
            abort(404, 'Missing collection slug');
        }

        $collection = Collection::with(['products'])
            ->where('slug', $collectionSlug)
            ->firstOrFail();

        return compact('collection');
    }
}
