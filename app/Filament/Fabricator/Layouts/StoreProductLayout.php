<?php

namespace App\Filament\Fabricator\Layouts;

use App\Models\Page;
use App\Models\Product;
use App\Utilities\ShopHelper;
use Z3d0X\FilamentFabricator\Layouts\Layout;

class StoreProductLayout extends Layout
{
    protected static ?string $name = 'store-product';

    public static function shouldRenderPage(Page $page): bool
    {
        $productSlug = ShopHelper::getProductSlug();

        // Ensure the page is a child of 'shop' and matches product route
        return str($page->slug)->startsWith(optional($page->parent)->slug.'/'.$productSlug.'/');
    }

    public static function getData(Page $page, array $context = []): array
    {
        $productSlug = $context['slug'] ?? null;

        if (! $productSlug) {
            abort(404, 'Missing product slug');
        }

        $product = Product::with(['images', 'variants'])
            ->where('slug', $productSlug)
            ->firstOrFail();

        return ['product' => $product];
    }
}
