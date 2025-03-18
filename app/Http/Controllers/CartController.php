<?php

namespace App\Http\Controllers;

use App\Services\FourthwallService;
use Illuminate\Http\Request;
use App\Models\ProductVariant;

class CartController extends Controller
{
    protected FourthwallService $fourthwallService;

    public function __construct(FourthwallService $fourthwallService)
    {
        $this->fourthwallService = $fourthwallService;
    }

    /**
     * Show the cart page.
     */
    public function showCart()
    {
        $cartId = session()->get('fourthwall_cart_id');

        if (!$cartId) {
            return view('store.cart', ['cart' => []]);
        }

        // Fetch cart details from Fourthwall API
        $cartResponse = $this->fourthwallService->getCart($cartId);

        return view('store.cart', ['cart' => $cartResponse ?? []]);
    }

    /**
     * Add product to the cart.
     */
    public function addToCart(Request $request)
    {
        $cartId = session()->get('fourthwall_cart_id');
        $variantId = $request->input('variant_id');
        $quantity = $request->input('quantity', 1);

        // Find the variant from the database
        $variant = ProductVariant::where('provider_id', $variantId)->first();

        if (!$variant) {
            return redirect()->back()->with('error', 'Variant not found.');
        }

        // If no cart exists, create a new one
        if (!$cartId) {
            $createCartResponse = $this->fourthwallService->createCart($variant->provider_id, $quantity);

            if (!$createCartResponse) {
                return redirect()->back()->with('error', 'Failed to add product to cart.');
            }

            // Store cart ID in session
            session()->put('fourthwall_cart_id', $createCartResponse['id']);
        } else {
            // If cart exists, add item to it
            $this->fourthwallService->addToCart($cartId, $variant->provider_id, $quantity);
        }

        return redirect()->route('store.cart.show')->with('success', 'Product added to cart!');
    }

    /**
     * Update the cart quantities.
     */
    public function updateCart(Request $request)
    {
        $cartId = session()->get('fourthwall_cart_id');

        if (!$cartId) {
            return redirect()->route('store.cart.show')->with('error', 'No active cart found.');
        }

        $updatedItems = [];

        foreach ($request->input('cart', []) as $variantId => $details) {
            $quantity = max(1, intval($details['quantity']));
            $updatedItems[] = ['variantId' => $variantId, 'quantity' => $quantity];
        }

        // Send update request to Fourthwall API
        $this->fourthwallService->updateCart($cartId, $updatedItems);

        return redirect()->route('store.cart.show')->with('success', 'Cart updated successfully.');
    }

    /**
     * Remove an item from the cart.
     */
    public function removeFromCart($variantId)
    {
        $cartId = session()->get('fourthwall_cart_id');

        if (!$cartId) {
            return back()->with('error', 'No active cart found.');
        }

        // Send delete request to Fourthwall API
        $this->fourthwallService->removeFromCart($cartId, $variantId);

        return back()->with('success', 'Item removed from cart.');
    }

    /**
     * Proceed to checkout.
     */
    public function checkout()
    {
        $cartId = session()->get('fourthwall_cart_id');

        if (!$cartId) {
            return redirect()->route('store.cart.show')->with('error', 'Your cart is empty.');
        }

        return $this->fourthwallService->redirectToCheckout($cartId);
    }
}
