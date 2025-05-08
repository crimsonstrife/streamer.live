<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class FabricatorStorePagesSeeder extends Seeder
{
    public function run(): void
    {
        // Store Catalog Page
        $shopPage = Page::updateOrCreate([
            'slug' => 'shop',
        ], [
            'title' => 'Shop',
            'layout' => 'store-catalog',
            'type' => 'shop',
            'blocks' => [
                [
                    'type' => 'store-category-list',
                    'data' => [
                        'title' => 'Shop by Category',
                    ],
                ],
                [
                    'type' => 'store-featured-products',
                    'data' => [
                        'title' => 'Featured Products',
                        'description' => 'Featured product selections from our store.',
                        'product_count' => 4,
                    ],
                ],
                [
                    'type' => 'store-catalog',
                    'data' => [
                    ],
                ],
            ],
        ]);

        // Product Detail Page Template (used for layout purposes)
        if (! empty($shopPage->id)) {
            Page::updateOrCreate([
                'slug' => 'product',
            ], [
                'title' => 'Product Detail',
                'layout' => 'store-product',
                'type' => 'product_detail',
                'parent_id' => $shopPage->id,
                'blocks' => [
                    [
                        'type' => 'store-product-detail',
                        'data' => [],
                    ],
                ],
            ]);
        }

        // Collection Detail Page Template (used for layout purposes)
        if (! empty($shopPage->id)) {
            Page::updateOrCreate([
                'slug' => 'collection',
            ], [
                'title' => 'Collection Detail',
                'layout' => 'store-collection',
                'type' => 'collection_detail',
                'parent_id' => $shopPage->id,
                'blocks' => [
                    [
                        'type' => 'store-collection-detail',
                        'data' => [],
                    ],
                ],
            ]);
        }
    }
}
