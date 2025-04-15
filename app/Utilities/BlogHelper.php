<?php

namespace App\Utilities;

use App\Models\Page;
use Illuminate\Support\Facades\Cache;

class BlogHelper
{
    private const BLOG_SLUG_CACHE_KEY = 'blog_slug';

    private const DEFAULT_BLOG_SLUG = 'blog';

    public static function clearSlugCache(): void
    {
        Cache::forget(self::BLOG_SLUG_CACHE_KEY);
    }

    public static function post(string $slug): string
    {
        return url(self::getBlogSlug().'/'.$slug);
    }

    public static function getBlogSlug(): string
    {
        return Cache::rememberForever(self::BLOG_SLUG_CACHE_KEY, fn () => self::fetchSlug());
    }

    private static function fetchSlug(): string
    {
        return Page::where('type', 'blog')->value('slug') ?? self::DEFAULT_BLOG_SLUG;
    }
}
