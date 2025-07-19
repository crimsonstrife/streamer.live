<?php

namespace App\Utilities;

use App\Models\BlogObjects\Post;
use App\Models\Page;
use Illuminate\Cache\TaggableStore;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;

/**
 * Class BlogHelper
 *
 * Utility class for managing blog-related functionality, such as retrieving
 * blog slugs, generating post URLs, and clearing cache for blog posts.
 */
class BlogHelper
{
    /**
     * Cache key for storing the blog slug.
     */
    private const BLOG_SLUG_CACHE_KEY = 'blog_slug';

    /**
     * Default slug for the blog if none is found in the database.
     */
    private const DEFAULT_BLOG_SLUG = 'blog';

    /**
     * Clears the cached blog slug.
     *
     * Removes the blog slug from the cache to ensure fresh data is fetched
     * the next time it is requested.
     */
    public static function clearSlugCache(): void
    {
        Cache::forget(self::BLOG_SLUG_CACHE_KEY);
    }

    /**
     * Generates the URL for a specific blog post.
     *
     * @param  string  $slug  The slug of the blog post.
     * @return string The full URL of the blog post.
     */
    public static function post(string $slug): string
    {
        return url(self::getBlogSlug().'/'.$slug);
    }

    /**
     * Retrieves the blog slug from the cache or database.
     *
     * If the slug is not cached, it fetches the slug from the database and
     * stores it in the cache for future use.
     *
     * @return string The blog slug.
     */
    public static function getBlogSlug(): string
    {
        return Cache::rememberForever(self::BLOG_SLUG_CACHE_KEY, fn () => self::fetchSlug());
    }

    /**
     * Fetches the blog slug from the database.
     *
     * If the 'pages' table exists, it retrieves the slug for the page of type 'blog'.
     * If no slug is found or the table does not exist, it returns the default slug.
     *
     * @return string The blog slug.
     */
    private static function fetchSlug(): string
    {
        if (Schema::hasTable('pages')) {
            return Page::where('type', 'blog')->value('slug') ?? self::DEFAULT_BLOG_SLUG;
        }

        return self::DEFAULT_BLOG_SLUG;
    }

    /**
     * Clears the cache for a specific blog post.
     *
     * If the cache store supports tagging, it flushes the cache for the blog
     * and the specific post. Otherwise, it removes individual cache keys.
     *
     * @param  Post  $post  The blog post for which the cache should be cleared.
     */
    public static function clearPostCache(Post $post): void
    {
        $store = Cache::getStore();

        if ($store instanceof TaggableStore) {
            Cache::tags(['blog', "post:{$post->slug}"])->flush();
        } else {
            // Fallback: forget individual keys (less efficient, but safe)
            Cache::forget("post:{$post->slug}");
            Cache::forget('blog.index');
        }
    }

    /**
     * Clears the cache for a specific blog post and the blog index.
     *
     * If the cache store supports tagging, it flushes the cache for the blog
     * and the specific post. Otherwise, it removes individual cache keys.
     *
     * @param  Post  $post  The blog post for which the cache should be cleared.
     */
    public static function clearPostCaches(Post $post): void
    {
        $store = Cache::getStore();

        if ($store instanceof TaggableStore) {
            Cache::tags(['blog', "post:{$post->slug}"])->flush();
            Cache::tags(['blog'])->flush();
        } else {
            Cache::forget("post:{$post->slug}");
            Cache::forget('blog.index');
        }
    }
}
