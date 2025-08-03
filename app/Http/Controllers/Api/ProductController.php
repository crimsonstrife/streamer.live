<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\StoreObjects\Collection;
use App\Models\StoreObjects\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    /**
     * Retrieves a paginated collection of product resources.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Product::query();

        if ($slug = $request->query('collection')) {
            $query->whereHas('collections', fn ($q) => $q->where('slug', $slug)
            );
        }

        return ProductResource::collection(
            $query->paginate(20)
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

    public function byCollection(string $slug): AnonymousResourceCollection
    {
        $collection = Collection::where('slug', $slug)->firstOrFail();

        $products = $collection
            ->products()
            ->paginate(20);

        return ProductResource::collection($products);
    }
}
