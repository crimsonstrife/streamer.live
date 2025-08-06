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

        $slug = $request->query('collection');
        if ($slug) {
            $query->whereHas(
                'collections',
                fn ($q) => $q->where('slug', $slug)
            );
        }

        return ProductResource::collection(
            $query->paginate(self::PAGE_SIZE)
        )->response()
            ->header('Cache-Control', 'public, max-age=' . self::CACHE_DURATION_SECONDS);
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

    /**
     * Retrieves a paginated collection of products for the specified collection.
     *
     * @param  string  $slug  The slug identifier of the collection.
     * @return JsonResponse
     */
    public function byCollection(string $slug): JsonResponse
    {
        $collection = Collection::where('slug', $slug)->firstOrFail();

        $products = $collection
            ->products()
            ->paginate(self::PAGE_SIZE);

        return ProductResource::collection($products)
            ->response()
            ->header('Cache-Control', 'public, max-age=360');
    }
}
