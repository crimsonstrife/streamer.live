<?php

namespace App\Http\Controllers;

use App\Services\FourthwallService;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    protected FourthwallService $fourthwallService;

    public function __construct(FourthwallService $fourthwallService)
    {
        $this->fourthwallService = $fourthwallService;
    }

    public function index()
    {
        $collections = $this->fourthwallService->getCollections();
        return view('store.index', compact('collections'));
    }

    public function showCollection($slug)
    {
        $storefrontToken = config('services.fourthwall.storefront_token');

        // Fetch collection details
        $collectionResponse = Http::withOptions(['verify' => false])
            ->get("https://storefront-api.fourthwall.com/v1/collections/{$slug}", [
                'storefront_token' => $storefrontToken
            ]);

        if ($collectionResponse->failed()) {
            abort(404, "Collection not found.");
        }

        $collection = $collectionResponse->json();

        // Fetch products for this collection
        $productsResponse = Http::withOptions(['verify' => false])
            ->get("https://storefront-api.fourthwall.com/v1/collections/{$slug}/products", [
                'storefront_token' => $storefrontToken
            ]);

        if ($productsResponse->failed()) {
            abort(404, "Unable to fetch products for this collection.");
        }

        $products = $productsResponse->json('results') ?? [];

        return view('store.collection', compact('products', 'collection'));
    }

    public function showProduct($slug)
    {
        $storefrontToken = config('services.fourthwall.storefront_token');

        // Fetch product details
        $productResponse = Http::withOptions(['verify' => false])
            ->get("https://storefront-api.fourthwall.com/v1/products/{$slug}", [
                'storefront_token' => $storefrontToken
            ]);

        if ($productResponse->failed()) {
            abort(404, "Product not found.");
        }

        $product = $productResponse->json();

        // Extract first variant price (if available)
        $price = null;
        if (!empty($product['variants']) && isset($product['variants'][0]['unitPrice']['value'])) {
            $price = [
                'value' => $product['variants'][0]['unitPrice']['value'],
                'currency' => $product['variants'][0]['unitPrice']['currency']
            ];
        }

        return view('store.product', compact('product', 'price'));
    }

    public function viewCart()
    {
        $cartId = session()->get('cart_id');

        if (!$cartId) {
            return redirect()->route('store.index')->with('error', 'Your cart is empty.');
        }

        $cart = $this->fourthwallService->getCart($cartId);
        return view('store.cart', compact('cart'));
    }

    public function checkout()
    {
        $cartId = session()->get('cart_id');

        if (!$cartId) {
            return redirect()->route('store.index')->with('error', 'Your cart is empty.');
        }

        return redirect()->away($this->fourthwallService->redirectToCheckout($cartId));
    }
}
