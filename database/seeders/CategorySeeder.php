<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Announcements', 'slug' => 'announcements', 'type' => 'post'],
            ['name' => 'Tutorials', 'slug' => 'tutorials', 'type' => 'post'],
            ['name' => 'Updates', 'slug' => 'updates', 'type' => 'post'],
            ['name' => 'Community', 'slug' => 'community', 'type' => 'post'],
        ];

        foreach ($categories as $category) {
            // Instantiate a new Category
            $newCategory = new Category();

            // Set the name of the Category
            $newCategory->name = $category['name'];

            // Set the slug of the Category
            $newCategory->slug = $category['slug'];

            // Set the type of the Category
            $newCategory->type = $category['type'];

            // Save the Category
            $newCategory->save();
        }
    }
}
