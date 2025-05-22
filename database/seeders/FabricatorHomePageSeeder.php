<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FabricatorHomePageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Home Page
        $homePage = Page::updateOrCreate([
            'slug' => '/',
        ], [
            'title' => 'Home',
            'layout' => 'default',
            'type' => null,
            'blocks' => [
            ],
        ]);
    }
}
