<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\StoreObjects\Product;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    /**
     * Retrieves a paginated collection of product resources.
     */
    public function index(): AnonymousResourceCollection
    {
        return ProductResource::collection(
            Product::paginate(20)     // or ->all() for everything
        );
    }

    /**
     * Displays the specified product resource.
     *
     * @param  Product  $product  The product instance to display.
     */
    public function show(Product $product): ProductResource
    {
        return new ProductResource($product);
    }
}
