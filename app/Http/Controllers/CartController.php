<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    protected $storefrontToken;

    public function __construct()
    {
        $this->storefrontToken = config('services.fourthwall.storefront_token');
    }

    /**
     * Display the cart page.
     */
    public function showCart()
    {
        $cart = Session::get('cart', []);

        return view('store.cart', compact('cart'));
    }

    /**
     * Add product to the cart.
     */
    public function addToCart(Request $request)
    {
        $cart = session()->get('cart', []);

        $productSlug = $request->input('product_slug'); // ✅ Fix: Use slug
        $variantId = $request->input('variant_id');

        // Fetch product details from API using slug
        $productResponse = Http::withOptions(['verify' => false])
            ->get("https://storefront-api.fourthwall.com/v1/products/{$productSlug}", [
                'storefront_token' => $this->storefrontToken
            ]);

        if ($productResponse->failed()) {
            abort(404, "Unable to fetch product.");
        }

        $product = $productResponse->json() ?? [];

        // Ensure the variant exists
        $variant = collect($product['variants'] ?? [])->firstWhere('id', $variantId);

        if (!$product || !$variant) {
            return redirect()->back()->with('error', 'Product not found.');
        }

        // Store product details in cart
        $cart[$variantId] = [
            'slug' => $productSlug,
            'variant_id' => $variantId,
            'name' => $product['name'],
            'variant_name' => $variant['name'],
            'price' => $variant['unitPrice']['value'] ?? 0,
            'currency' => $variant['unitPrice']['currency'] ?? 'USD',
            'quantity' => ($cart[$variantId]['quantity'] ?? 0) + 1,
            'image' => isset($product['images'][0]['url']) ? $product['images'][0]['url'] : null,
        ];

        session()->put('cart', $cart);

        return redirect()->route('store.cart.show')->with('success', 'Product added to cart!');
    }

    public function updateCart(Request $request)
    {
        $cart = session()->get('cart', []);

        foreach ($request->input('cart', []) as $variantId => $details) {
            if (isset($cart[$variantId])) {
                $cart[$variantId]['quantity'] = max(1, intval($details['quantity'])); // Ensure quantity is at least 1
            }
        }

        session()->put('cart', $cart);

        return redirect()->route('store.cart.show')->with('success', 'Cart updated successfully.');
    }

    /**
     * Remove item from cart.
     */
    public function removeFromCart($variantId)
    {
        $cart = Session::get('cart', []);

        $updatedCart = collect($cart)->reject(fn ($item) => $item['variant_id'] === $variantId)->values()->all();

        Session::put('cart', $updatedCart);

        return back()->with('success', 'Item removed from cart.');
    }

    /**
     * Proceed to checkout by creating a cart in Fourthwall and redirecting to checkout.
     */
    public function checkout()
    {
        $cartItems = session()->get('cart', []);

        if (empty($cartItems)) {
            return redirect()->route('store.cart.show')->with('error', 'Your cart is empty.');
        }

        $storefrontToken = config('services.fourthwall.storefront_token');
        $cartCurrency = 'USD'; // Change as needed
        $cartId = session()->get('fourthwall_cart_id'); // Ensure this is stored when adding items

        if (!$cartId) {
            return redirect()->route('store.cart.show')->with('error', 'Failed to retrieve cart ID.');
        }

        // Construct the Fourthwall checkout URL
        $checkoutDomain = config('services.fourthwall.storefront_url', 'https://store.fourthwall.com');
        $checkoutUrl = "{$checkoutDomain}/checkout/?cartCurrency={$cartCurrency}&cartId={$cartId}";

        // Clear session cart before redirecting
        //session()->forget('cart');

        return redirect()->away($checkoutUrl);
    }
}
