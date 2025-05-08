<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class FabricatorBlogPagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Blog Index Page
        $blogIndexPage = Page::updateOrCreate([
            'slug' => 'blog',
        ], [
            'title' => 'Blog',
            'layout' => 'blog-index',
            'type' => 'blog',
            'blocks' => [
                [
                    'type' => 'blog-featured-posts',
                    'data' => [],
                ],
                [
                    'type' => 'blog-post-list',
                    'data' => [],
                ],
            ],
        ]);

        // If the Blog Index exists, as the route for individual pages.
        if (! empty($blogIndexPage->id)) {
            Page::updateOrCreate([
                'slug' => 'post',
            ], [
                'title' => 'Blog Post',
                'layout' => 'blog-post-detail',
                'type' => 'blog',
                'parent_id' => $blogIndexPage->id,
                'blocks' => [
                    [
                        'type' => 'blog-post',
                        'data' => [],
                    ],
                    [
                        'type' => 'blog-author-bio',
                        'data' => [],
                    ],
                    [
                        'type' => 'blog-comments',
                        'data' => [],
                    ],
                ],
            ]);
        }
    }
}
