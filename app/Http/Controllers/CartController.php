<?php

namespace App\Http\Controllers;

use App\Models\ProductVariant;
use App\Services\FourthwallService;
use App\Utilities\CartHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class CartController extends Controller
{
    protected FourthwallService $fourthwallService;
    protected CartHelper $cartHelper;

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
            $cartId = $this->cartHelper->getCartId();

            // If no cart exists, return an empty cart
            if (! $cartId) {
                return view('store.cart', ['cart' => []]);
            }

            // Fetch cart details from Fourthwall API
            $cartResponse = $this->fourthwallService->getCart($cartId);

            if (!$cartResponse) {
                return view('store.cart', ['cart' => []]);
            }

            return view('store.cart', ['cart' => $cartResponse]);
        } catch (\Exception $e) {
            Log::error('Cart session retrieval failed: '.$e->getMessage());

            return redirect()->route('store.index')->with('error', 'Could not load cart. Please try again.');
        } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            Log::error('Cart session not found: '.$e->getMessage());

            return back()->with('error', 'Cart not found: '.$e->getMessage());
        }
    }

    /**
     * Add product to the cart.
     */
    public function addToCart(Request $request): ?\Illuminate\Http\RedirectResponse
    {
        try {
            $variantId = $request->input('variant_id');
            $quantity = max(1, (int) $request->input('quantity', 1));

            $variant = ProductVariant::where('provider_id', $variantId)->first();

            if (! $variant) {
                return redirect()->back()->with('error', 'Variant not found.');
            }

            $cartId = $this->cartHelper->getCartId();

            // If no cart exists, create one
            if (! $cartId) {
                $createCartResponse = $this->fourthwallService->createCart($variant->provider_id, $quantity);

                if (! $createCartResponse || ! isset($createCartResponse['id'])) {
                    return redirect()->back()->with('error', 'Failed to create a new cart.');
                }

                // Store the newly created cart ID in session
                $this->cartHelper->setCartId($createCartResponse['id']);
            } else {
                // If a cart exists, add item to it
                $addItemResponse = $this->fourthwallService->addToCart($cartId, $variant->provider_id, $quantity);

                if (! $addItemResponse) {
                    return redirect()->back()->with('error', 'Failed to add product to cart.');
                }
            }

            return redirect()->route('store.cart.show')->with('success', 'Product added to cart!');
        } catch (\Exception $e) {
            Log::error('Failed to add product to cart: '.$e->getMessage());

            return redirect()->back()->with('error', 'An error occurred while adding the product to the cart.');
        }
    }

    /**
     * Update the cart quantities.
     */
    public function updateCart(Request $request): ?\Illuminate\Http\RedirectResponse
    {
        try {
            $cartId = $this->cartHelper->getCartId();

            if (! $cartId) {
                return redirect()->route('store.cart.show')->with('error', 'No active cart found.');
            }

            $updatedItems = [];

            foreach ($request->input('cart', []) as $variantId => $details) {
                $quantity = max(1, (int) $details['quantity']);
                $updatedItems[] = ['variantId' => $variantId, 'quantity' => $quantity];
            }

            // Send update request to Fourthwall API
            $updateResponse = $this->fourthwallService->updateCart($cartId, $updatedItems);

            if (!$updateResponse) {
                return redirect()->route('store.cart.show')->with('error', 'Failed to update cart.');
            }

            return redirect()->route('store.cart.show')->with('success', 'Cart updated successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to update cart: '.$e->getMessage());

            return redirect()->route('store.cart.show')->with('error', 'An error occurred while updating the cart.');
        } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            Log::error('Cart session not found: '.$e->getMessage());

            return back()->with('error', 'Cart not found: '.$e->getMessage());
        }
    }

    /**
     * Remove an item from the cart.
     */
    public function removeFromCart($variantId): ?\Illuminate\Http\RedirectResponse
    {
        try {
            $cartId = $this->cartHelper->getCartId();

            if (! $cartId) {
                return back()->with('error', 'No active cart found.');
            }

            // Send delete request to Fourthwall API
            $removeResponse = $this->fourthwallService->removeFromCart($cartId, $variantId);

            if (!$removeResponse) {
                return back()->with('error', 'Failed to remove item from cart.');
            }

            return back()->with('success', 'Item removed from cart.');
        } catch (\Exception $e) {
            Log::error('Failed to remove item from cart: '.$e->getMessage());

            return back()->with('error', 'An error occurred while removing the item.');
        } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            Log::error('Cart session not found: '.$e->getMessage());

            return back()->with('error', 'Cart not found: '.$e->getMessage());
        }
    }

    /**
     * Proceed to checkout.
     */
    public function redirectToCheckout(): ?\Illuminate\Http\RedirectResponse
    {
        try {
            $cartId = $this->cartHelper->getCartId();

            if (! $cartId) {
                return redirect()->route('store.cart.show')->with('error', 'Your cart is empty.');
            }

            // Generate checkout URL using FourthwallService
            $cartCurrency = 'USD'; // Adjust as needed
            $checkoutUrl = $this->fourthwallService->getCheckoutUrl($cartId, $cartCurrency);

            // Store checkout URL in session for the view
            session()->put('checkout_url', $checkoutUrl);
            // Store the cart currency in session for the view
            session()->put('cart_currency', $cartCurrency);

            return redirect()->route('store.checkout.external');
        } catch (\Exception $e) {
            Log::error('Checkout failed: '.$e->getMessage());

            return redirect()->route('store.cart.show')->with('error', 'An error occurred while processing checkout.');
        } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
            Log::error('Cart session not found: '.$e->getMessage());

            return back()->with('error', 'Cart not found: '.$e->getMessage());
        }
    }
}
