<?php

namespace App\View\Helpers;

use App\Models\StoreObjects\Collection;
use App\Models\BlogObjects\Post;
use App\Models\StoreObjects\Product;
use App\Utilities\BlogHelper;
use App\Utilities\ShopHelper;

class Breadcrumb
{
    public static function forPost(Post $post): array
    {
        $blogSlug = BlogHelper::getBlogSlug();               // 'blog'

        return [
            ...self::home(),
            'Blog' => route($blogSlug.'.index'),
            $post->title => url()->current(),
        ];
    }

    public static function home(string $label = 'Home'): array
    {
        return [$label => url('/')];
    }

    public static function forProduct(Product $product): array
    {
        $shopSlug = ShopHelper::getShopSlug();               // 'shop'
        $productSlug = ShopHelper::getProductSlug();         // 'product'

        return [
            ...self::home(),
            'Shop' => route($shopSlug.'.page'),
            $product->name => url()->current(),
        ];
    }

    public static function forCollection(Collection $collection): array
    {
        $shopSlug = ShopHelper::getShopSlug();               // 'shop'
        $productSlug = ShopHelper::getProductSlug();         // 'product'
        $collectionSlug = ShopHelper::getCollectionSlug();   // 'collection'

        return [
            ...self::home(),
            'Shop' => route($shopSlug.'.page'),
            $collection->name => url()->current(),
        ];
    }

    public static function forPage(string $label): array
    {
        return [
            ...self::home(),
            $label => url()->current(),
        ];
    }
}
