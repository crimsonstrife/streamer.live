<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Page;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'title' => 'Home',
                'slug' => 'home',
                'excerpt' => 'Welcome to the site!',
                'content' => '<p>This is the homepage content.</p>',
                'status' => 'published',
                'is_protected' => false,
                'published_at' => now(),
            ],
            [
                'title' => 'Blog',
                'slug' => 'blog',
                'excerpt' => 'Latest updates and articles.',
                'content' => '<p>Here you will find our latest blog posts.</p>',
                'status' => 'published',
                'is_protected' => false,
                'published_at' => now(),
            ],
            [
                'title' => 'About',
                'slug' => 'about',
                'excerpt' => 'Learn more about us.',
                'content' => '<p>About page content goes here.</p>',
                'status' => 'published',
                'is_protected' => false,
                'published_at' => now(),
            ],
            [
                'title' => 'Contact',
                'slug' => 'contact',
                'excerpt' => 'Get in touch with us.',
                'content' => '<p>Contact form and details.</p>',
                'status' => 'published',
                'is_protected' => false,
                'published_at' => now(),
            ],
        ];

        foreach ($pages as $page) {
            // Instantiate a new Page model
            $pageModel = new Page();

            $pageModel->firstOrCreate(['slug' => $page['slug']], $page);

            // Save the Page model
            $pageModel->save();
        }
    }
}
