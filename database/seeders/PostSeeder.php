<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        $admin = User::first(); // Assumes there's at least one user

        if ($categories->isEmpty() || !$admin) {
            $this->command->warn('Skipping post seeding: No categories or users found.');
            return;
        }

        $posts = [
            [
                'title' => 'Welcome to the Blog',
                'slug' => 'welcome-to-the-blog',
                'excerpt' => 'An introduction to our new blog!',
                'content' => '<p>We are excited to share updates and insights with you!</p>',
                'status' => 'published',
                'is_protected' => false,
                'published_at' => now(),
            ],
            [
                'title' => 'Upcoming Features in Streamer.live',
                'slug' => 'upcoming-features-streamer-live',
                'excerpt' => 'A sneak peek at new features coming soon!',
                'content' => '<p>We are working on some exciting updates...</p>',
                'status' => 'published',
                'is_protected' => false,
                'published_at' => now(),
            ],
        ];

        foreach ($posts as $postData) {
            $category = $categories[0]; // Use the first category
            $postData['category_id'] = $category->id;
            $postData['created_by'] = $admin->id;
            $postData['updated_by'] = $admin->id;

            // Instantiate a new Post model
            $newPost = new Post($postData);

            // Save the new Post model
            $newPost->save();
        }
    }
}
