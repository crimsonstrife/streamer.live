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
        $collections = $this->fourthwallService->getCollections();

        foreach ($collections['results'] as $collection) {
            foreach ($this->fourthwallService->getProductsInCollection($collection['slug'])['results'] as $item) {
                Product::updateOrCreate(
                    ['external_url' => $item['url']], // Ensure uniqueness
                    [
                        'name' => $item['name'],
                        'description' => $item['description'] ?? '',
                        'price' => $item['variants'][0]['unitPrice']['value'] ?? 0,
                        'image' => $item['images'][0]['url'] ?? null,
                    ]
                );
            }
        }

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

        return view('store.cart', compact('cart'));
    }
}
