<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'Twitch', 'slug' => 'twitch'],
            ['name' => 'Streaming', 'slug' => 'streaming']
        ];

        foreach ($tags as $tag) {
            // Instantiate a new Tag model
            $newTag = new Tag();

            // Set the name attribute of the Tag model
            $newTag->name = $tag['name'];

            // Set the slug attribute of the Tag model
            $newTag->slug = $tag['slug'];

            // Save the Tag model to the database
            $newTag->save();
        }
    }
}
