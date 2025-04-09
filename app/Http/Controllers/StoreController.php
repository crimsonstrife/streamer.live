<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Product;
use App\Services\FourthwallService;
use App\Utilities\CartHelper;
use App\Utilities\ShopHelper;

class StoreController extends Controller
{
    protected FourthwallService $fourthwallService;

    protected CartHelper $cartHelper;

    public function __construct(FourthwallService $fourthwallService, CartHelper $cartHelper)
    {
        $this->fourthwallService = $fourthwallService;
        $this->cartHelper = $cartHelper;
    }

    /**
     * Optional: Used for global header cart item count or AJAX responses.
     */
    public function getCartItemCount(): int
    {
        return $this->cartHelper->getCartItemCount();
    }

    /**
     * Return product details JSON for optional use in product blocks.
     */
    public function fetchProduct($slug)
    {
        $product = Product::with('images', 'variants')->where('slug', $slug)->firstOrFail();

        return response()->json($product);
    }

    /**
     * Return collection details and its products.
     */
    public function fetchCollection($slug)
    {
        $collection = Collection::where('slug', $slug)
            ->with(['products' => fn ($query) => $query->with('images', 'variants')])
            ->firstOrFail();

        return response()->json($collection);
    }

    // Optional fallback if needed in legacy routes
    public function redirectToShop()
    {
        // Detect the Fabricator shop page slug dynamically or fallback
        $shopSlug = ShopHelper::getShopSlug(); // custom helper

        return redirect()->to("/{$shopSlug}");
    }

    /**
     * Show the store homepage with all collections.
     */
    public function index()
    {
        $shopSlug = ShopHelper::getShopSlug();
        // Fetch collections from the database instead of API
        $collections = Collection::all();

        return view($shopSlug.'.index', compact('collections'));
    }
}
