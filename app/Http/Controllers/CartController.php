<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\ProductVariant;

class CartController extends Controller
{
    /**
     * Show the cart page.
     */
    public function showCart()
    {
        $cart = session()->get('cart', []);

        return view('store.cart', compact('cart'));
    }

    /**
     * Add product to the cart.
     */
    public function addToCart(Request $request)
    {
        $variantId = $request->input('variant_id');
        $quantity = max(1, (int) $request->input('quantity', 1));

        // Find the variant from the local database
        $variant = ProductVariant::where('provider_id', $variantId)->first();

        if (!$variant) {
            return redirect()->back()->with('error', 'Variant not found.');
        }

        // Get the current cart from session
        $cart = session()->get('cart', []);

        // If the item already exists in the cart, update the quantity
        if (isset($cart[$variantId])) {
            $cart[$variantId]['quantity'] += $quantity;
        } else {
            // Add new item to cart
            $cart[$variantId] = [
                'name' => $variant->name,
                'price' => $variant->price,
                'currency' => $variant->currency,
                'quantity' => $quantity,
                'image' => $variant->product->images->first()->local_path ?? null,
            ];
        }

        // Store updated cart in session
        session()->put('cart', $cart);

        return redirect()->route('store.cart.show')->with('success', 'Product added to cart!');
    }

    /**
     * Update the cart quantities.
     */
    public function updateCart(Request $request)
    {
        $cart = session()->get('cart', []);

        foreach ($request->input('cart', []) as $variantId => $details) {
            if (isset($cart[$variantId])) {
                $cart[$variantId]['quantity'] = max(1, (int) $details['quantity']);
            }
        }

        // Store updated cart in session
        session()->put('cart', $cart);

        return redirect()->route('store.cart.show')->with('success', 'Cart updated successfully.');
    }

    /**
     * Remove an item from the cart.
     */
    public function removeFromCart($variantId)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$variantId])) {
            unset($cart[$variantId]);
        }

        // Store updated cart in session
        session()->put('cart', $cart);

        return back()->with('success', 'Item removed from cart.');
    }

    /**
     * Proceed to checkout (Redirect to External Checkout).
     */
    public function redirectToCheckout(FourthwallService $fourthwallService)
    {
        $cartId = session()->get('fourthwall_cart_id');

        if (!$cartId) {
            return redirect()->route('store.cart.show')->with('error', 'Your cart is empty.');
        }

        // Generate checkout URL using FourthwallService
        $checkoutUrl = $fourthwallService->getCheckoutUrl($cartId);

        // Store checkout URL in session
        session()->put('checkout_url', $checkoutUrl);

        return redirect()->route('store.checkout.external');
    }
}
