<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use App\Models\ProductVariant;
use App\Services\FourthwallService;

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
        try {
            $cartId = session()->get('fourthwall_cart_id');

            // If no cart exists, return an empty cart
            if (!$cartId) {
                return view('store.cart', ['cart' => []]);
            }

            // Fetch cart details from Fourthwall API
            $cart = $this->fourthwallService->getCart($cartId);

            return view('store.cart', compact('cart'));
        } catch (\Exception $e) {
            Log::error('Cart session retrieval failed: ' . $e->getMessage());
            return redirect()->route('store.index')->with('error', 'Could not load cart. Please try again.');
        }
    }

    /**
     * Add product to the cart.
     */
    public function addToCart(Request $request)
    {
        try {
            $variantId = $request->input('variant_id');
            $quantity = max(1, (int) $request->input('quantity', 1));

            $variant = ProductVariant::where('provider_id', $variantId)->first();

            if (!$variant) {
                return redirect()->back()->with('error', 'Variant not found.');
            }

            $cartId = session()->get('fourthwall_cart_id');

            // If no cart exists, create one
            if (!$cartId) {
                $createCartResponse = $this->fourthwallService->createCart($variant->provider_id, $quantity);

                if (!$createCartResponse || !isset($createCartResponse['id'])) {
                    return redirect()->back()->with('error', 'Failed to create a new cart.');
                }

                // Store the newly created cart ID in session
                $cartId = $createCartResponse['id'];
                session()->put('fourthwall_cart_id', $cartId);
            } else {
                // If a cart exists, add item to it
                $addItemResponse = $this->fourthwallService->addToCart($cartId, $variant->provider_id, $quantity);

                if (!$addItemResponse) {
                    return redirect()->back()->with('error', 'Failed to add product to cart.');
                }
            }

            return redirect()->route('store.cart.show')->with('success', 'Product added to cart!');
        } catch (\Exception $e) {
            Log::error('Failed to add product to cart: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while adding the product to the cart.');
        }
    }

    /**
     * Update the cart quantities.
     */
    public function updateCart(Request $request)
    {
        try {
            $cartId = session()->get('fourthwall_cart_id');

            if (!$cartId) {
                return redirect()->route('store.cart.show')->with('error', 'No active cart found.');
            }

            $updatedItems = [];

            foreach ($request->input('cart', []) as $variantId => $details) {
                $quantity = max(1, intval($details['quantity']));
                $updatedItems[] = ['variantId' => $variantId, 'quantity' => $quantity];
            }

            $this->fourthwallService->updateCart($cartId, $updatedItems);

            return redirect()->route('store.cart.show')->with('success', 'Cart updated successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to update cart: ' . $e->getMessage());
            return redirect()->route('store.cart.show')->with('error', 'An error occurred while updating the cart.');
        }
    }

    /**
     * Remove an item from the cart.
     */
    public function removeFromCart($variantId)
    {
        try {
            $cartId = session()->get('fourthwall_cart_id');

            if (!$cartId) {
                return back()->with('error', 'No active cart found.');
            }

            $this->fourthwallService->removeFromCart($cartId, $variantId);

            return back()->with('success', 'Item removed from cart.');
        } catch (\Exception $e) {
            Log::error('Failed to remove item from cart: ' . $e->getMessage());
            return back()->with('error', 'An error occurred while removing the item.');
        }
    }

    /**
     * Proceed to checkout.
     */
    public function redirectToCheckout()
    {
        try {
            $cartId = session()->get('fourthwall_cart_id');

            if (!$cartId) {
                return redirect()->route('store.cart.show')->with('error', 'Your cart is empty.');
            }

            // Generate checkout URL using FourthwallService
            $checkoutUrl = $this->fourthwallService->getCheckoutUrl($cartId);

            // Store checkout URL in session
            session()->put('checkout_url', $checkoutUrl);

            return redirect()->route('store.checkout.external');
        } catch (\Exception $e) {
            Log::error('Checkout failed: ' . $e->getMessage());
            return redirect()->route('store.cart.show')->with('error', 'An error occurred while processing checkout.');
        }
    }
}
