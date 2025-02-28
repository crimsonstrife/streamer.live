<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class FourthwallService
{
    protected string $baseUrl;
    protected string $storefrontToken;

    public function __construct()
    {
        $this->baseUrl = config('services.fourthwall.base_url', 'https://storefront-api.fourthwall.com');
        $this->storefrontToken = config('services.fourthwall.storefront_token');
    }

    private function request(string $method, string $endpoint, array $params = [])
    {
        $params['storefront_token'] = $this->storefrontToken;

        return Http::withOptions([
            'verify' => false // Disable SSL verification
        ])->{$method}("{$this->baseUrl}{$endpoint}", $params)->json();
    }

    public function getProducts()
    {
        return $this->request('get', '/v1/products');
    }

    public function getProduct(string $slug)
    {
        return $this->request('get', "/v1/products/{$slug}");
    }

    public function getCollections()
    {
        return $this->request('get', '/v1/collections');
    }

    public function getProductsInCollection(string $slug)
    {
        return $this->request('get', "/v1/collections/{$slug}/products");
    }

    public function createCart(string $currency = 'USD')
    {
        return $this->request('post', '/v1/carts', ['currency' => $currency]);
    }

    public function addToCart(string $cartId, string $variantId, int $quantity = 1)
    {
        return $this->request('post', "/v1/carts/{$cartId}/add", [
            'items' => [['variantId' => $variantId, 'quantity' => $quantity]],
        ]);
    }

    public function removeFromCart(string $cartId, string $variantId)
    {
        return $this->request('post', "/v1/carts/{$cartId}/remove", [
            'items' => [['variantId' => $variantId]],
        ]);
    }

    public function getCart(string $cartId)
    {
        return $this->request('get', "/v1/carts/{$cartId}");
    }

    public function redirectToCheckout(string $cartId)
    {
        return "https://store.fourthwall.com/checkout?cart_id={$cartId}";
    }
}
