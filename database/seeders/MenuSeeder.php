<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use TomatoPHP\FilamentMenus\Models\Menu;
use TomatoPHP\FilamentMenus\Models\MenuItem;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $homePage = Page::where('slug', '/')->first();
        $blogPage = Page::where('slug', 'blog')->first();
        $shopPage = Page::where('slug', 'shop')->first();

        $mainMenu = Menu::updateOrCreate([
            'key' => 'header-nav-main',
        ], [
            'title' => 'Main Navigation',
            'location' => 'header',
            'activated' => 1,
        ]);

        if ($mainMenu !== null) {
            if ($homePage !== null) {
                // Add Home page to menu items as a route.
                MenuItem::updateOrCreate([
                    'title' => [
                        'ar' => null,
                        'en' => 'Home',
                        'id' => null,
                        'my' => null,
                        'pt_BR' => null,
                    ],
                    'menu_id' => $mainMenu->id,
                ], [
                    'menu_id' => $mainMenu->id,
                    'icon' => null,
                    'has_badge' => 0,
                    'has_badge_query' => 1,
                    'is_route' => 1,
                    'route' => 'fabricator.page.home',
                    'new_tab' => 0,
                    'order' => 1,
                ]);
            } else {
                Log::error('No homepage found to add to menu');
            }

            if ($blogPage !== null) {
                MenuItem::updateOrCreate([
                    'title' => [
                        'ar' => null,
                        'en' => 'Blog',
                        'id' => null,
                        'my' => null,
                        'pt_BR' => null,
                    ],
                    'menu_id' => $mainMenu->id,
                ], [
                    'menu_id' => $mainMenu->id,
                    'icon' => null,
                    'has_badge' => 0,
                    'has_badge_query' => 1,
                    'is_route' => 1,
                    'route' => 'blog.index',
                    'new_tab' => 0,
                    'order' => 2,
                ]);
            } else {
                Log::error('No blog page found to add to menu');
            }

            if ($shopPage !== null) {
                MenuItem::updateOrCreate([
                    'title' => [
                        'ar' => null,
                        'en' => 'Shop',
                        'id' => null,
                        'my' => null,
                        'pt_BR' => null,
                    ],
                    'menu_id' => $mainMenu->id,
                ], [
                    'menu_id' => $mainMenu->id,
                    'icon' => null,
                    'has_badge' => 0,
                    'has_badge_query' => 1,
                    'is_route' => 1,
                    'route' => 'shop.page',
                    'new_tab' => 0,
                    'order' => 3,
                ]);
            } else {
                Log::error('No shop page found to add to menu');
            }
        }

        $footerMenuOne = Menu::updateOrCreate([
            'key' => 'footer-nav-1',
        ], [
            'title' => 'Footer Navigation 1',
            'location' => 'footer',
            'activated' => 1,
        ]);

        if ($footerMenuOne !== null) {
            if ($homePage !== null) {
                // Add Home page to menu items as a route.
                MenuItem::updateOrCreate([
                    'title' => [
                        'ar' => null,
                        'en' => 'Home',
                        'id' => null,
                        'my' => null,
                        'pt_BR' => null,
                    ],
                    'menu_id' => $footerMenuOne->id,
                ], [
                    'menu_id' => $footerMenuOne->id,
                    'icon' => null,
                    'has_badge' => 0,
                    'has_badge_query' => 1,
                    'is_route' => 1,
                    'route' => 'fabricator.page.home',
                    'new_tab' => 0,
                    'order' => 1,
                ]);
            } else {
                Log::error('No homepage found to add to menu');
            }
        }

        $footerMenuTwo = Menu::updateOrCreate([
            'key' => 'footer-nav-2',
        ], [
            'title' => 'Footer Navigation 2',
            'location' => 'footer',
            'activated' => 1,
        ]);

        if ($footerMenuTwo !== null) {
            if ($blogPage !== null) {
                MenuItem::updateOrCreate([
                    'title' => [
                        'ar' => null,
                        'en' => 'Blog',
                        'id' => null,
                        'my' => null,
                        'pt_BR' => null,
                    ],
                    'menu_id' => $footerMenuTwo->id,
                ], [
                    'menu_id' => $footerMenuTwo->id,
                    'icon' => null,
                    'has_badge' => 0,
                    'has_badge_query' => 1,
                    'is_route' => 1,
                    'route' => 'blog.index',
                    'new_tab' => 0,
                    'order' => 1,
                ]);
            } else {
                Log::error('No blog page found to add to menu');
            }
        }

        $footerMenuThree = Menu::updateOrCreate([
            'key' => 'footer-nav-3',
        ], [
            'title' => 'Footer Navigation 3',
            'location' => 'footer',
            'activated' => 1,
        ]);

        if ($footerMenuThree !== null) {
            if ($shopPage !== null) {
                MenuItem::updateOrCreate([
                    'title' => [
                        'ar' => null,
                        'en' => 'Shop',
                        'id' => null,
                        'my' => null,
                        'pt_BR' => null,
                    ],
                    'menu_id' => $footerMenuThree->id,
                ], [
                    'menu_id' => $footerMenuThree->id,
                    'icon' => null,
                    'has_badge' => 0,
                    'has_badge_query' => 1,
                    'is_route' => 1,
                    'route' => 'shop.page',
                    'new_tab' => 0,
                    'order' => 1,
                ]);
            } else {
                Log::error('No shop page found to add to menu');
            }
        }
    }
}
