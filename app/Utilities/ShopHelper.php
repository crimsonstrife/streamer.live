<?php

namespace App\Utilities;

use App\Models\OrderItem;
use App\Models\Page;
use Illuminate\Support\Facades\Cache;

class ShopHelper
{
    private const SHOP_SLUG_CACHE_KEY = 'shop_slug';

    private const COLLECTION_SLUG_CACHE_KEY = 'collection_slug';

    private const PRODUCT_SLUG_CACHE_KEY = 'product_slug';

    private const DEFAULT_SHOP_SLUG = 'shop';

    private const DEFAULT_COLLECTION_SLUG = 'collection';

    private const DEFAULT_PRODUCT_SLUG = 'product';

    /**
     * Get the slug of the current shop page.
     */
    public static function getShopSlug(): string
    {
        return Cache::rememberForever(self::SHOP_SLUG_CACHE_KEY, fn () => self::fetchShopSlug());
    }

    public static function getProductSlug(): string
    {
        return Cache::rememberForever(self::PRODUCT_SLUG_CACHE_KEY, fn () => self::fetchProductSlug());
    }

    public static function getCollectionSlug(): string
    {
        return Cache::rememberForever(self::COLLECTION_SLUG_CACHE_KEY, fn () => self::fetchCollectionSlug());
    }

    /**
     * Clear the cached shop slug.
     */
    public static function clearSlugCache(): void
    {
        Cache::forget(self::SHOP_SLUG_CACHE_KEY);
        Cache::forget(self::COLLECTION_SLUG_CACHE_KEY);
        Cache::forget(self::PRODUCT_SLUG_CACHE_KEY);
    }

    /**
     * Fetch the shop slug from the database.
     */
    private static function fetchShopSlug(): string
    {
        return Page::where('type', 'shop')->value('slug') ?? self::DEFAULT_SHOP_SLUG;
    }

    private static function fetchCollectionSlug(): string
    {
        return Page::where('type', 'collection_detail')->value('slug') ?? self::DEFAULT_COLLECTION_SLUG;
    }

    /**
     * Fetch the product slug from the database
     */
    private static function fetchProductSlug(): string
    {
        return Page::where('type', 'product_detail')->value('slug') ?? self::DEFAULT_PRODUCT_SLUG;
    }

    public static function product(string $slug, string $prefix = self::DEFAULT_SHOP_SLUG): string
    {
        $product = self::fetchProductSlug();

        return url("{$prefix}/{$product}/{$slug}");
    }

    public static function collection(string $slug, string $prefix = self::DEFAULT_SHOP_SLUG): string
    {
        $collection = self::fetchCollectionSlug();

        return url("{$prefix}/{$collection}/{$slug}");
    }

    public static function userHasPurchasedProduct(int $userId, int $productId): bool
    {
        return OrderItem::whereHas(
            'order',
            fn ($query) => $query->where('user_id', $userId)
        )->whereHas(
            'variant',
            fn ($query) => $query->where('product_id', $productId)
        )->exists();
    }
}
