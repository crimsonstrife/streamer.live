<?php

namespace App\Http\Controllers;

use App\Models\StoreObjects\ProductVariant;
use App\Services\FourthwallService;
use App\Settings\FourthwallSettings;
use App\Utilities\CartHelper;
use App\Utilities\ShopHelper;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class CartController extends Controller
{
    protected FourthwallService $fourthwallService;

    protected CartHelper $cartHelper;

    public function __construct(FourthwallService $fourthwallService, CartHelper $cartHelper)
    {
        if (! app(FourthwallSettings::class)->enable_integration) {
            abort(404);
        }
        $this->fourthwallService = $fourthwallService;
        $this->cartHelper = $cartHelper;
    }

    /**
     * Show the cart page.
     */
    public function showCart()
    {
        $shopSlug = ShopHelper::getShopSlug();
        try {
            if (! $this->cartHelper->hasCartId()) {
                return view($shopSlug.'.cart', ['cart' => []]);
            }

            $cart = $this->cartHelper->getCartContents();

            return view($shopSlug.'.cart', ['cart' => $cart ?? []]);
        } catch (Throwable $e) {
            Log::error('Cart session retrieval failed: '.$e->getMessage());

            return redirect()->route($shopSlug.'.page')->with('error', 'Could not load cart. Please try again.');
        }
    }

    /**
     * Add product to the cart.
     */
    public function addToCart(Request $request): ?RedirectResponse
    {
        $shopSlug = ShopHelper::getShopSlug();
        try {
            $variant_id = $request->input('variant_id');
            $quantity = max(1, (int) $request->input('quantity', 1));

            $variant = ProductVariant::where('provider_id', $variant_id)->first();

            if (! $variant) {
                return redirect()->back()->with('error', 'Variant not found.');
            }

            $cartID = $this->cartHelper->getCartId();
            $created = false;
            $added = false;
            if (! $cartID) {
                $created = $this->fourthwallService->createCart($variant->provider_id, $quantity);
            } else {
                $added = $this->fourthwallService->addToCart($cartID, $variant->provider_id, $quantity);
            }

            if (! $added && ! $created) {
                return redirect()->back()->with('error', 'Failed to add product to cart.');
            }

            return redirect()->route($shopSlug.'.cart.show')->with('success', 'Product added to cart!');
        } catch (Throwable $e) {
            Log::error('Failed to add product to cart: '.$e->getMessage());

            return redirect()->back()->with('error', 'An error occurred while adding the product to the cart.');
        }
    }

    /**
     * Update the cart quantities.
     */
    public function updateCart(Request $request): ?RedirectResponse
    {
        $shopSlug = ShopHelper::getShopSlug();
        try {
            if (! $this->cartHelper->hasCartId()) {
                return redirect()->route($shopSlug.'.cart.show')->with('error', 'No active cart found.');
            }

            $updatedItems = [];

            foreach ($request->input('cart', []) as $variant_id => $details) {
                $quantity = max(1, (int) $details['quantity']);
                $updatedItems[] = ['variant_id' => $variant_id, 'quantity' => $quantity];
            }

            $updated = $this->cartHelper->updateCart($updatedItems);

            if (! $updated) {
                return redirect()->route($shopSlug.'.cart.show')->with('error', 'Failed to update cart.');
            }

            return redirect()->route($shopSlug.'.cart.show')->with('success', 'Cart updated successfully.');
        } catch (Throwable $e) {
            Log::error('Failed to update cart: '.$e->getMessage());

            return redirect()->route($shopSlug.'.cart.show')->with('error', 'An error occurred while updating the cart.');
        }
    }

    /**
     * Remove an item from the cart.
     */
    public function removeFromCart(string $variant_id): ?RedirectResponse
    {
        try {
            if (! $this->cartHelper->hasCartId()) {
                return back()->with('error', 'No active cart found.');
            }

            $removed = $this->cartHelper->removeFromCart($variant_id);

            if (! $removed) {
                return back()->with('error', 'Failed to remove item from cart.');
            }

            return back()->with('success', 'Item removed from cart.');
        } catch (Throwable $e) {
            Log::error('Failed to remove item from cart: '.$e->getMessage());

            return back()->with('error', 'An error occurred while removing the item.');
        }
    }

    /**
     * Proceed to checkout.
     */
    public function redirectToCheckout(): ?RedirectResponse
    {
        $shopSlug = ShopHelper::getShopSlug();
        try {
            if (! $this->cartHelper->hasCartId()) {
                return redirect()->route($shopSlug.'.cart.show')->with('error', 'Your cart is empty.');
            }

            $checkoutUrl = $this->cartHelper->getCheckoutUrl();

            // Removed duplicate session management for checkout URL.
            // The CartHelper->getCheckoutUrl method already handles storing the checkout URL and cart currency into the session.

            $currency = config('app.default_currency', 'USD'); // Use configurable default
            session()->put('cart_currency', $currency);

            return redirect()->route('cart.checkout.external');
        } catch (Throwable $e) {
            Log::error('Checkout failed: '.$e->getMessage());

            return redirect()->route($shopSlug.'.cart.show')->with('error', 'An error occurred while processing checkout.');
        }
    }

    public function getCartItemCount(): int
    {
        return $this->cartHelper->getCartItemCount();
    }
}
