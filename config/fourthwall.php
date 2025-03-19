<?php

return [
    'chunk_size' => [
        'collections' => 10,
        'products' => 5,
        'images' => 5,
    ],
    'enable_gc' => true, // Enable garbage collection
    'default_product_image' => env('FOURTHWALL_DEFAULT_PRODUCT_IMAGE', 'products/default.jpg'),
];
