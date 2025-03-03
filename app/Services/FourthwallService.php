<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class FourthwallService
{
    protected string $baseUrl;
    protected string $storefrontToken;
    protected string $storefrontUrl;
    protected bool $verify;

    /**
     * FourthwallService constructor.
     * Initializes a new instance of the FourthwallService class.
     */
    public function __construct()
    {
        $this->baseUrl = config('services.fourthwall.base_url', 'https://storefront-api.fourthwall.com');
        $this->storefrontToken = config('services.fourthwall.storefront_token');
        $this->storefrontUrl = config('services.fourthwall.storefront_url', 'https://storefront.fourthwall.com');
        $this->verify = config('services.fourthwall.verify', true);
    }

    /**
     * Makes an HTTP request to the specified endpoint using the given method and parameters.
     *
     * @param string $method The HTTP method to use for the request (e.g., 'GET', 'POST').
     * @param string $endpoint The API endpoint to send the request to.
     * @param array $params Optional parameters to include in the request.
     *
     * @return mixed The response from the API.
     */
    private function request(string $method, string $endpoint, array $queryParams = [], array $bodyParams = [])
    {
        // Check if the query parameters are not empty
        if (!empty($queryParams)) {
            //if not empty, check if the storefront token is set
            if ($this->storefrontToken) {
                //if set, add the storefront token to the query parameters
                $queryParams['storefront_token'] = $this->storefrontToken;
            } else {
                //if not set, throw an exception
                throw new \Exception('Storefront token is required for this request.');
            }
        } else {
            //if empty, check if the storefront token is set
            if ($this->storefrontToken) {
                //if set, add the storefront token to the query parameters
                $queryParams = ['storefront_token' => $this->storefrontToken];
            } else {
                //if not set, throw an exception
                throw new \Exception('Storefront token is required for this request.');
            }
        }

        $url = "{$this->baseUrl}/{$endpoint}?" . http_build_query($queryParams, '', '&');

        return Http::withOptions([
            'verify' => $this->verify,
        ])
            ->withQueryParameters($queryParams)
            ->{$method}($url, $method === 'get' ? [] : $bodyParams) // Only send body for non-GET requests
            ->json();
    }

    /**
     * Make a GET request to the Fourthwall API
     *
     * @param string $endpoint The endpoint to make the request to.
     * @param array $queryParams The query parameters to include in the request.
     *
     * @return mixed The response from the API.
     */
    private function getRequest(string $endpoint, array $queryParams = [])
    {
        return $this->request('get', $endpoint, $queryParams, []);
    }

    /**
     * Make a POST request to the Fourthwall API
     *
     * @param string $endpoint The endpoint to make the request to.
     * @param array $bodyParams The body parameters to include in the request.
     * @param array $queryParams The query parameters to include in the request.
     *
     * @return mixed The response from the API.
     */
    private function postRequest(string $endpoint, array $queryParams = [], array $bodyParams)
    {
        return $this->request('post', $endpoint, $queryParams, $bodyParams);
    }

    /**
     * Fetch a single product
     *
     */
    public function getProduct(string $slug)
    {
        return $this->getRequest("v1/products/{$slug}");
    }

    /**
     * Generate checkout URL
     */
    public function getCheckoutUrl(string $cartId, string $currency = 'USD')
    {
        return $this->storefrontUrl . "checkout/?cartCurrency={$currency}&cartId={$cartId}";
    }

    /**
     * Retrieves the list of products.
     *
     */
    public function getProducts()
    {
        return $this->getRequest('v1/products');
    }

    /**
     * Retrieve a list of collections.
     */
    public function getCollections()
    {
        return $this->getRequest('v1/collections');
    }

    /**
     * Retrieves a collection based on the provided slug.
     *
     * @param string $slug The slug identifier for the collection.
     */
    public function getCollection(string $slug)
    {
        return $this->getRequest("v1/collections/{$slug}");
    }

    /**
     * Retrieves the products from a collection based on the provided slug.
     *
     * @param string $slug The slug identifier for the collection.
     */
    public function getCollectionProducts(string $slug)
    {
        return $this->getRequest("v1/collections/{$slug}/products");
    }

    /**
     * Adds items to a new cart.
     *
     * @param string $variantId The ID of the variant to be added to the cart.
     * @param int $quantity The quantity of the item to be added to the cart, default is 1.
     * @param string $currency The currency code for the transaction. Default is 'USD'.
     */
    public function createCart(string $variantId, int $quantity = 1, string $currency = 'USD')
    {
        $params = [
            'currency' => $currency,
        ];

        $itemArray = [
            'items' => [
                [
                    'variantId' => $variantId,
                    'quantity' => $quantity,
                ],
            ],
        ];

        // Create a new cart
        return $createCartResponse = $this->postRequest("v1/carts", $itemArray, $params);
    }

    /**
     * Adds items to the cart.
     *
     * @param string $cartId The ID of the cart.
     * @param string $variantId The ID of the variant to be added to the cart.
     * @param int $quantity The quantity of the item to be added to the cart, default is 1.
     * @param string $currency The currency code for the transaction. Default is 'USD'.
     */
    public function addToCart(string $cartId, string $variantId, int $quantity = 1, string $currency = 'USD')
    {
        $params = [
            'currency' => $currency,
        ];

        $itemArray = [
            'items' => [
                [
                    'variantId' => $variantId,
                    'quantity' => $quantity,
                ],
            ],
        ];

        // Add items to the cart
        return $this->postRequest("v1/carts/{$cartId}/add", $itemArray, $params);
    }

    /**
     * Removes an item from the cart.
     *
     * @param string $cartId The ID of the cart.
     * @param string $variantId The ID of the variant to be removed from the cart.
     */
    public function removeFromCart(string $cartId, string $variantId)
    {
        $itemArray = [
            'items' => [
                [
                    'variantId' => $variantId,
                ],
            ],
        ];

        return $this->postRequest("v1/carts/{$cartId}/remove", $itemArray, []);
    }

    /**
     * Updates the cart with the provided items.
     * @param array $items The items to be updated in the cart.
     *
     * @return mixed The response from the API.
     */
    public function updateCart(string $cartId, array $items)
    {
        $itemArray = [
            'items' => $items,
        ];

        return $this->postRequest("v1/carts/{$cartId}/change", $itemArray, []);
    }

    /**
     * Retrieve the cart details based on the provided cart ID.
     *
     * @param string $cartId The unique identifier of the cart.
     * @return mixed The cart details or null if not found.
     */
    public function getCart(string $cartId)
    {
        return $this->getRequest("v1/carts/{$cartId}");
    }


    /**
     * Redirects the user to the checkout page.
     *
     * @param string $cartId The ID of the cart to be checked out.
     * @param string $currency The currency to be used for the checkout. Default is 'USD'.
     * @return \Illuminate\Http\RedirectResponse The redirect response to the checkout page.
     */
    public function redirectToCheckout(string $cartId, string $currency = 'USD')
    {
        // Generate the checkout URL
        $checkoutUrl = $this->getCheckoutUrl($cartId, $currency);

        // Redirect the user to the checkout page
        return redirect($checkoutUrl);
    }
}
