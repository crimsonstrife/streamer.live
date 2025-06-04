<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\AuthObjects\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed starter Category (Uncategorized)
        $uncategorizedCategory = Category::updateOrCreate([
            'slug' => 'uncategorized',
        ], [
            'name' => 'Uncategorized',
            'type' => 'blog',
            'is_visible' => true,
            'description' => '',
        ]);

        // Make sure an Author exists for the admin user, seeding should only be done at the start, so this should be the first user.
        $adminUser = User::first();

        $author = Author::updateOrCreate([
            'user_id' => $adminUser->id,
        ], [
            'name' => $adminUser->name,
            'email' => $adminUser->email,
        ]);

        // Seed a starter "hello world" post if the category and author exists
        if (! empty($uncategorizedCategory->id) && ! empty($author->id)) {
            $hello_world_post = Post::updateOrCreate([
                'slug' => 'hello-world',
            ], [
                'title' => 'Hello World!',
                'blog_author_id' => $author->id,
                'category_id' => $uncategorizedCategory->id,
                'content' => '<p>Welcome to Streamer. This is your first post. Edit or delete it, then start writing!</p>',
                'published_at' => Carbon::now(),
            ]);
        }

        // Seed a comment to the post
        if (! empty($hello_world_post->id)) {
            $dummyComment = Comment::updateOrCreate([
                'commented_on_type' => 'App\Models\Post',
                'commented_on_id' => $hello_world_post->id,
                'commented_by_type' => 'App\Models\AuthObjects\User',
                'commented_by_id' => $adminUser->id,
            ], [
                'text' => 'Hi, this is a comment. To get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.',
                'approved' => true,
            ]);
        }
    }
}
