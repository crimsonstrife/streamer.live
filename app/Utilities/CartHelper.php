<?php

namespace App\Utilities;

use Illuminate\Support\Facades\Session;

/**
 * Class CartHelper
 *
 * Handles session-based cart ID storage and retrieval logic
 * for Fourthwall carts across the application.
 *
 * @package App\Helpers
 *
 * Usage:
 * $cartHelper->getCartId();
 * $cartHelper->setCartId('abc123');
 * $cartHelper->hasCartId();
 */
class CartHelper
{
    protected const CART_SESSION_KEY = 'fourthwall_cart_id';

    /**
     * Get the cart ID from session.
     *
     * @return string|null
     */
    public function getCartId(): ?string
    {
        return Session::get(self::CART_SESSION_KEY);
    }

    /**
     * Set the cart ID in session.
     *
     * @param string $cartId
     * @return void
     */
    public function setCartId(string $cartId): void
    {
        Session::put(self::CART_SESSION_KEY, $cartId);
    }

    /**
     * Determine if a cart ID exists in the session.
     *
     * @return bool
     */
    public function hasCartId(): bool
    {
        return Session::has(self::CART_SESSION_KEY);
    }

    /**
     * Remove the cart ID from session.
     *
     * @return void
     */
    public function clearCartId(): void
    {
        Session::forget(self::CART_SESSION_KEY);
    }

    /**
     * Get or create the current cart ID.
     *
     * @param callable $onCreate Closure to call if cart creation is needed.
     * @return string|null
     */
    public function getOrCreateCartId(callable $onCreate): ?string
    {
        if ($this->hasCartId()) {
            return $this->getCartId();
        }

        $newCartId = $onCreate();

        if ($newCartId) {
            $this->setCartId($newCartId);
            return $newCartId;
        }

        return null;
    }
}
