<?php

namespace App\Utilities;

use App\Services\FourthwallService;
use Illuminate\Support\Facades\Session;

/**
 * Class CartHelper
 *
 * Handles session-based cart ID storage and retrieval logic
 * for Fourthwall carts across the application.
 */
class CartHelper
{
    protected const CART_SESSION_KEY = 'fourthwall_cart_id';

    protected FourthwallService $fourthwall;

    public function __construct(FourthwallService $fourthwall)
    {
        $this->fourthwall = $fourthwall;
    }

    /**
     * Get the cart ID from session.
     */
    public function getCartId(): ?string
    {
        return Session::get(self::CART_SESSION_KEY);
    }

    /**
     * Set the cart ID in session.
     */
    public function setCartId(string $cartId): void
    {
        Session::put(self::CART_SESSION_KEY, $cartId);
    }

    /**
     * Determine if a cart ID exists in the session.
     */
    public function hasCartId(): bool
    {
        return Session::has(self::CART_SESSION_KEY);
    }

    /**
     * Remove the cart ID from session.
     */
    public function clearCartId(): void
    {
        Session::forget(self::CART_SESSION_KEY);
    }

    /**
     * Get the cart ID or create a new cart with a given variant.
     */
    public function getOrCreateCart(string $variant_id, int $quantity = 1): ?string
    {
        if ($this->hasCartId()) {
            return $this->getCartId();
        }

        $response = $this->fourthwall->createCart($variant_id, $quantity);

        if ($response && isset($response['id'])) {
            $this->setCartId($response['id']);

            return $response['id'];
        }

        return null;
    }

    /**
     * Add a variant to the current cart (create if necessary).
     */
    public function addToCart(string $variant_id, int $quantity = 1): bool
    {
        $cartId = $this->getOrCreateCart($variant_id, $quantity);

        if (! $cartId) {
            return false;
        }

        return (bool) $this->fourthwall->addToCart($cartId, $variant_id, $quantity);
    }

    /**
     * Get the current cart contents.
     */
    public function getCartContents(): ?array
    {
        $cartId = $this->getCartId();

        if (! $cartId) {
            return null;
        }

        return $this->fourthwall->getCart($cartId);
    }

    /**
     * Remove an item from the cart.
     */
    public function removeFromCart(string $variant_id): bool
    {
        $cartId = $this->getCartId();

        if (! $cartId) {
            return false;
        }

        return (bool) $this->fourthwall->removeFromCart($cartId, $variant_id);
    }

    public function updateCart(array $items): bool
    {
        $cartId = $this->getCartId();

        if (! $cartId) {
            return false;
        }

        $formattedItems = collect($items)->map(function ($item) {
            return [
                'variant_id' => $item['variant_id'],
                'quantity' => max(1, (int) $item['quantity']),
            ];
        })->toArray();

        $response = $this->fourthwall->updateCart($cartId, $formattedItems);

        return (bool) $response;
    }

    public function getCheckoutUrl(string $currency = 'USD'): ?string
    {
        $cartId = $this->getCartId();

        if (! $cartId) {
            return null;
        }

        $url = $this->fourthwall->getCheckoutUrl($cartId, $currency);

        if ($url) {
            session()->put('checkout_url', $url);
            session()->put('cart_currency', $currency);
        }

        return $url;
    }

    public function getCartItemCount(): int
    {
        $cartId = $this->getCartId();

        if (! $cartId) {
            return 0;
        }

        $cart = $this->fourthwall->getCart($cartId);

        if (! $cart || !isset($cart['items'])) {
            return 0;
        }

        return collect($cart['items'])->sum('quantity');
    }


}
