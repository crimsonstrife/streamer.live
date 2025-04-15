<?php

namespace App\Filament\Fabricator\Layouts;

use App\Models\Post;
use Z3d0X\FilamentFabricator\Layouts\Layout;

class BlogPostDetail extends Layout
{
    protected static ?string $name = 'blog-post-detail';

    public static function getData($page, array $params = []): array
    {
        $slug = $params['slug'] ?? null;
        $post = Post::where('slug', $slug)->with(['author', 'category', 'tags'])->firstOrFail();

        return compact('post');
    }
}
