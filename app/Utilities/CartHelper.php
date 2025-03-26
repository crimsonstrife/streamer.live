<?php

namespace App\Utilities;

use App\Models\ProductVariant;
use App\Services\FourthwallService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

/**
 * Class CartHelper
 *
 * Handles session-based cart ID storage and retrieval logic
 * for Fourthwall carts across the application.
 */
class CartHelper
{
    private const CART_SESSION_KEY = 'fourthwall_cart_id';

    protected FourthwallService $fourthwall;

    /**
     * CartHelper constructor.
     *
     * @param  FourthwallService  $fourthwall  The Fourthwall service instance.
     */
    public function __construct(FourthwallService $fourthwall)
    {
        $this->fourthwall = $fourthwall;
    }

    /**
     * Get the cart ID from session.
     *
     * @return string|null The cart ID or null if not found.
     */
    public function getCartId(): ?string
    {
        return Session::get(self::CART_SESSION_KEY);
    }

    /**
     * Set the cart ID in session.
     *
     * @param  string  $cartId  The cart ID to set.
     */
    public function setCartId(string $cartId): void
    {
        Session::put(self::CART_SESSION_KEY, $cartId);
    }

    /**
     * Determine if a cart ID exists in the session.
     *
     * @return bool True if a cart ID exists, false otherwise.
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
     *
     * @param  string  $variant_id  The ID of the product variant.
     * @param  int  $quantity  The quantity of the item to add to the cart.
     * @return string|null The cart ID or null if creation failed.
     */
    public function getOrCreateCart(string $variant_id, int $quantity = 1): ?string
    {
        $productAvailability = $this->fourthwall->validateProductStock($variant_id);

        if (is_bool($productAvailability) && ! $productAvailability) {
            Log::error('Product stock not found/ or out of stock');

            return null;
        }

        if ($this->hasCartId()) {
            return $this->getCartId();
        }

        $response = $this->fourthwall->createCart($variant_id, $quantity);

        Log::debug('Fourthwall createCart response:', $response);

        if ($response && isset($response['id'])) {
            $this->setCartId($response['id']);

            return $response['id'];
        }

        return null;
    }

    /**
     * Add a variant to the current cart (create if necessary).
     *
     * @param  string  $variant_id  The ID of the product variant.
     * @param  int  $quantity  The quantity of the item to add to the cart.
     * @return bool True if the item was added successfully, false otherwise.
     */
    public function addToCart(string $variant_id, int $quantity = 1): bool
    {
        $productAvailability = $this->fourthwall->validateProductStock($variant_id);

        if (is_bool($productAvailability) && ! $productAvailability) {
            Log::error('Product stock not found/ or out of stock');

            return false;
        }

        $cartId = $this->getOrCreateCart($variant_id, $quantity);

        if (! $cartId) {
            return false;
        }

        return (bool) $this->fourthwall->addToCart($cartId, $variant_id, $quantity);
    }

    /**
     * Get the current cart contents.
     *
     * @return array|null The cart contents or null if the cart is empty.
     */
    public function getCartContents(): ?array
    {
        $cartId = $this->getCartId();

        if (! $cartId) {
            return null;
        }

        $cart = $this->fourthwall->getCart($cartId);

        if (! $cart || ! isset($cart['items'])) {
            return null;
        }

        foreach ($cart['items'] as &$item) {
            // Get the Fourthwall-provided variant ID
            $fwVariantId = $item['variant']['id'] ?? null;

            // Match with local ProductVariant by provider_id
            $localVariant = ProductVariant::with('product', 'images')
                ->where('provider_id', $fwVariantId)
                ->first();

            $item = (object) $item;
            $item->variant = $localVariant;

            if (! $localVariant) {
                Log::warning("Variant not found locally for Fourthwall variant ID: $fwVariantId");
            }
        }

        return $cart;
    }

    /**
     * Remove an item from the cart.
     *
     * @param  string  $variant_id  The ID of the product variant to remove.
     * @return bool True if the item was removed successfully, false otherwise.
     */
    public function removeFromCart(string $variant_id): bool
    {
        $cartId = $this->getCartId();

        if (! $cartId) {
            return false;
        }

        return (bool) $this->fourthwall->removeFromCart($cartId, $variant_id);
    }

    /**
     * Update the cart with new items.
     *
     * @param  array  $items  The items to update in the cart.
     * @return bool True if the cart was updated successfully, false otherwise.
     */
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

        // check the variants to ensure the new quantity doesn't exceed available stock
        foreach ($formattedItems as $item) {
            $productAvailability = $this->fourthwall->validateProductStock($item['variant_id']);
            if (is_bool($productAvailability) && ! $productAvailability) {
                Log::error('Product stock not found/ or out of stock');

                return false;
            }

            if ($productAvailability['type'] === 'UNLIMITED') {
                continue;
            }

            if ($productAvailability['amount'] < $item['quantity']) {
                Log::error('Not enough stock.');

                return false;
            }
        }

        $response = $this->fourthwall->updateCart($cartId, $formattedItems);

        return (bool) $response;
    }

    /**
     * Get the checkout URL for the current cart.
     *
     * @param  string  $currency  The currency for the checkout.
     * @return string|null The checkout URL or null if the cart ID is not found.
     */
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

    /**
     * Get the total item count in the current cart.
     *
     * @return int The total item count in the cart.
     */
    public function getCartItemCount(): int
    {
        $cartId = $this->getCartId();

        if (! $cartId) {
            return 0;
        }

        $cart = $this->fourthwall->getCart($cartId);

        if (! $cart || ! isset($cart['items'])) {
            return 0;
        }

        return collect($cart['items'])->sum('quantity');
    }
}
