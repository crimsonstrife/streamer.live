<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class FourthwallService
{
    protected $baseUrl;
    protected $storeToken;

    public function __construct()
    {
        $this->baseUrl = config('services.fourthwall.base_url');
        $this->storeToken = config('services.fourthwall.storefront_token');
    }

    private function request($endpoint, $params = [])
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->storeToken,
            'Accept' => 'application/json',
        ])->get("{$this->baseUrl}{$endpoint}", $params)->json();
    }

    public function getProducts()
    {
        return $this->request('/v1/collections');
    }

    public function getProduct($slug)
    {
        return $this->request("/v1/products/{$slug}");
    }

    public function getCollections()
    {
        return $this->request('/v1/collections');
    }

    public function getProductsInCollection($slug)
    {
        return $this->request("/v1/collections/{$slug}/products");
    }

    public function createCart($currency = 'USD')
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->storeToken,
            'Accept' => 'application/json',
        ])->post("{$this->baseUrl}/v1/carts", [
            'currency' => $currency,
        ])->json();
    }

    public function addToCart($cartId, $variantId, $quantity = 1)
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->storeToken,
            'Accept' => 'application/json',
        ])->post("{$this->baseUrl}/v1/carts/{$cartId}/add", [
            'items' => [['variantId' => $variantId, 'quantity' => $quantity]],
        ])->json();
    }

    public function removeFromCart($cartId, $variantId)
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->storeToken,
            'Accept' => 'application/json',
        ])->post("{$this->baseUrl}/v1/carts/{$cartId}/remove", [
            'items' => [['variantId' => $variantId]],
        ])->json();
    }

    public function getCart($cartId)
    {
        return $this->request("/v1/carts/{$cartId}");
    }
}
