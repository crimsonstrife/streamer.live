<?php

namespace App\Http\Controllers;

use App\Services\FourthwallService;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    protected $fourthwallService;

    public function __construct(FourthwallService $fourthwallService)
    {
        $this->fourthwallService = $fourthwallService;
    }

    public function index()
    {
        // Fetch collections from API
        $apiCollections = $this->fourthwallService->getCollections();

        // Sync collections with local database
        foreach ($apiCollections['results'] as $collection) {
            ProductCollection::updateOrCreate(
                ['slug' => $collection['slug']],
                ['name' => $collection['name'], 'description' => $collection['description'] ?? '']
            );
        }

        $collections = ProductCollection::all();
        $products = Product::all();

        return view('store.index', compact('collections', 'products'));
    }

    public function showCollection($slug)
    {
        // Fetch products dynamically from Fourthwall API
        $collection = $this->fourthwallService->getProductsInCollection($slug);

        return view('store.collection', compact('collection', 'slug'));
    }

    public function showProduct($slug)
    {
        $product = Product::where('external_url', "https://fourthwall.com/products/{$slug}")->first();

        if (!$product) {
            $product = $this->fourthwallService->getProduct($slug);
        }

        return view('product.show', compact('product'));
    }

    public function addToCart(Request $request)
    {
        $cartId = $request->session()->get('cart_id', null);

        if (!$cartId) {
            $cart = $this->fourthwallService->createCart();
            $cartId = $cart['id'];
            $request->session()->put('cart_id', $cartId);
        }

        $this->fourthwallService->addToCart($cartId, $request->variant_id, $request->quantity ?? 1);

        return redirect()->back()->with('success', 'Item added to cart!');
    }

    public function removeFromCart(Request $request)
    {
        $cartId = $request->session()->get('cart_id', null);

        if (!$cartId) {
            return redirect()->route('store.index')->with('error', 'Cart not found.');
        }

        $this->fourthwallService->removeFromCart($cartId, $request->variant_id);

        return redirect()->back()->with('success', 'Item removed from cart!');
    }

    public function viewCart(Request $request)
    {
        $cartId = $request->session()->get('cart_id', null);

        if (!$cartId) {
            return redirect()->route('store.index')->with('error', 'Your cart is empty.');
        }

        $cart = $this->fourthwallService->getCart($cartId);

        // Redirect to checkout
        return redirect()->away($cart['checkout_url']);
    }
}
