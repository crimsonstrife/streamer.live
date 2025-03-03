<?php

namespace App\Http\Controllers;

use App\Services\FourthwallService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    protected FourthwallService $fourthwallService;

    public function __construct(FourthwallService $fourthwallService)
    {
        $this->fourthwallService = $fourthwallService;
    }

    /**
     * Display the cart page.
     */
    public function showCart()
    {
        $cartId = session()->get('fourthwall_cart_id');

        if (!$cartId) {
            return view('store.cart', ['cart' => []]);
        }

        // Fetch cart details from Fourthwall API
        $cartResponse = $this->fourthwallService->getCart($cartId);

        if (!$cartResponse) {
            return view('store.cart', ['cart' => []]);
        }

        $cart = $cartResponse ?? [];

        return view('store.cart', ['cart' => $cart]);
    }

    /**
     * Add product to the cart.
     */
    public function addToCart(Request $request)
    {
        $cartId = session()->get('fourthwall_cart_id');
        $productSlug = $request->input('product_slug');
        $variantId = $request->input('variant_id');
        $quantity = $request->input('quantity', 1);

        // Fetch product details from API using slug
        $productResponse = $this->fourthwallService->getProduct($productSlug);

        if (!$productResponse) {
            abort(404, "Unable to fetch product.");
        }

        $product = $productResponse ?? [];
        $variant = collect($product['variants'] ?? [])->firstWhere('id', $variantId);

        if (!$product || !$variant) {
            return redirect()->back()->with('error', 'Product not found.');
        }

        // If no cart exists, create a new one
        if (!$cartId) {
            // Create cart in Fourthwall API, and store the cart ID in session
            $createCartResponse = $this->fourthwallService->createCart($variantId, $quantity);

            if (!$createCartResponse) {
                return redirect()->back()->with('error', 'Failed to add product to cart.');
            }

            // Store cart ID in session
            $cartId = $createCartResponse['id'];
            session()->put('fourthwall_cart_id', $cartId);
        } else {
            // If cart exists, add item to it
            $addItemResponse = $this->fourthwallService->addToCart($cartId, $variantId, $quantity);

            if (!$addItemResponse) {
                return redirect()->back()->with('error', 'Failed to add product to cart.');
            }
        }

        return redirect()->route('store.cart.show')->with('success', 'Product added to cart!');
    }

    public function updateCart(Request $request)
    {
        $cartId = session()->get('fourthwall_cart_id');

        if (!$cartId) {
            return redirect()->route('store.cart.show')->with('error', 'No active cart found.');
        }

        $updatedItems = [];

        foreach ($request->input('cart', []) as $variantId => $details) {
            $quantity = max(1, intval($details['quantity'])); // Ensure quantity is at least 1
            $updatedItems[] = ['variantId' => $variantId, 'quantity' => $quantity];
        }

        // Send update request to Fourthwall API
        $updateResponse = $this->fourthwallService->updateCart($cartId, $updatedItems);

        if (!$updateResponse) {
            return redirect()->route('store.cart.show')->with('error', 'Failed to update cart.');
        }

        return redirect()->route('store.cart.show')->with('success', 'Cart updated successfully.');
    }

    public function removeFromCart($variantId)
    {
        $cartId = session()->get('fourthwall_cart_id');

        if (!$cartId) {
            return back()->with('error', 'No active cart found.');
        }

        // Send delete request to Fourthwall API
        $removeResponse = $this->fourthwallService->removeFromCart($cartId, $variantId);

        if (!$removeResponse) {
            return back()->with('error', 'Failed to remove item from cart.');
        }

        return back()->with('success', 'Item removed from cart.');
    }

    /**
     * Proceed to checkout by creating a cart in Fourthwall and redirecting to checkout.
     */
    public function checkout(Request $request)
    {
        $cartId = session()->get('fourthwall_cart_id');

        if (!$cartId) {
            return redirect()->route('store.cart.show')->with('error', 'Your cart is empty.');
        }

        $cartCurrency = 'USD'; // Adjust as needed
        $checkoutDomain = config('services.fourthwall.storefront_url');
        $checkoutUrl = $this->fourthwallService->getCheckoutUrl($cartId, 'USD');

        return redirect()->away($checkoutUrl);
    }
}
