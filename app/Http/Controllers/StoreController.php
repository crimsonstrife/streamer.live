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
        // Fetch collection details
        $collectionResponse = $this->fourthwallService->getCollection($slug);

        if (!$collectionResponse) {
            abort(404, "Collection not found.");
        }

        $collection = $collectionResponse;

        // Fetch products for this collection
        $productsResponse = $this->fourthwallService->getCollectionProducts($slug);

        if (!$productsResponse) {
            abort(404, "Products not found.");
        }

        $products = $productsResponse;

        return view('store.collection', compact('collection', 'products'));
    }

    public function showProduct($slug)
    {
        // Fetch product details
        $productResponse = $this->fourthwallService->getProduct($slug);

        if (!$productResponse) {
            abort(404, "Product not found.");
        }

        $product = $productResponse;

        // Extract first variant price (if available)
        $price = null;
        if (!empty($product['variants']) && isset($product['variants'][0]['unitPrice']['value'])) {
            $price = [
                'value' => $product['variants'][0]['unitPrice']['value'],
                'currency' => $product['variants'][0]['unitPrice']['currency']
            ];
        }

        // Extract first variant ID (if available)
        $variantId = null;
        if (!empty($product['variants']) && isset($product['variants'][0]['id'])) {
            $variantId = $product['variants'][0]['id'];
        }

        // Render product view
        return view('store.product', compact('product', 'price', 'variantId'));
    }

    public function viewCart()
    {
        // Get cart ID from session
        $cartId = session()->get('cart_id');

        // If no cart exists, redirect to store index
        if (!$cartId) {
            return redirect()->route('store.index')->with('error', 'Your cart is empty.');
        }

        // Fetch cart details
        $cart = $this->fourthwallService->getCart($cartId);

        return view('store.cart', compact('cart'));
    }

    public function checkout()
    {
        // Get cart ID from session
        $cartId = session()->get('cart_id');

        // If no cart exists, redirect to store index
        if (!$cartId) {
            return redirect()->route('store.index')->with('error', 'Your cart is empty.');
        }

        // Redirect to checkout page
        return $this->fourthwallService->redirectToCheckout($cartId);
    }
}
