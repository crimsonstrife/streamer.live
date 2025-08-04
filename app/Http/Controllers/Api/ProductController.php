<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\StoreObjects\Collection;
use App\Models\StoreObjects\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Retrieves a paginated collection of product resources.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::query();

        if ($slug = $request->query('collection')) {
            $query->whereHas(
                'collections',
                fn ($q) => $q->where('slug', $slug)
            );
        }

        return ProductResource::collection(
            $query->paginate(20)
        )->response()
            ->header('Cache-Control', 'public, max-age=360');
    }

    /**
     * Displays the specified product resource.
     *
     * @param  Product  $product  The product instance to display.
     */
    public function show(Product $product): JsonResponse
    {
        return (new ProductResource($product))
            ->response()
            ->header('Cache-Control', 'public, max-age=360');
    }

    public function byCollection(string $slug): JsonResponse
    {
        $collection = Collection::where('slug', $slug)->firstOrFail();

        $products = $collection
            ->products()
            ->paginate(20);

        return ProductResource::collection($products)
            ->response()
            ->header('Cache-Control', 'public, max-age=360');
    }
}
