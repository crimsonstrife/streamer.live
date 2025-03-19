<?php

namespace App\Http\Controllers;

use App\Services\FourthwallService;
use Illuminate\Http\Request;
use App\Models\Collection;
use App\Models\Product;

class StoreController extends Controller
{
    protected FourthwallService $fourthwallService;

    public function __construct(FourthwallService $fourthwallService)
    {
        $this->fourthwallService = $fourthwallService;
    }

    /**
     * Show the store homepage with all collections.
     */
    public function index()
    {
        // Fetch collections from the database instead of API
        $collections = Collection::all();

        return view('store.index', compact('collections'));
    }

    /**
     * Show a specific collection and its products.
     */
    public function showCollection($slug)
    {
        // Find collection in the database
        $collection = Collection::where('slug', $slug)
            ->with('products.images', 'products.variants')
            ->firstOrFail();

        // Get products associated with this collection
        $products = $collection->products()->with('images', 'variants')->get();

        // Apply html_entity_decode to text fields to ensure consistent decoding
        $collection->name = html_entity_decode($collection->name);
        $collection->description = html_entity_decode($collection->description);

        return view('store.collection', compact('collection', 'products'));
    }

    /**
     * Show a specific product page.
     */
    public function showProduct($slug)
    {
        // Retrieve the product using the slug and eager load the relations
        $product = Product::where('slug', $slug)
            ->with('images', 'variants')
            ->firstOrFail();

        // Apply html_entity_decode to text fields to ensure consistent decoding
        $product->name = html_entity_decode($product->name);
        $product->description = html_entity_decode($product->description);

        return view('store.product', compact('product'));
    }
}
