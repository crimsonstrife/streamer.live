<x-app-layout>
    <div class="max-w-4xl px-4 py-6 mx-auto">
        <div class="p-6 bg-white rounded-lg shadow">
            <img src="{{ $product['image'] ?? $product['images'][0]['url'] }}" class="object-cover w-full h-64 rounded">
            <h1 class="mt-4 text-2xl font-bold">{{ $product['title'] ?? $product['name'] }}</h1>
            <p class="text-gray-700">{{ $product['description'] }}</p>
            <p class="mt-2 text-gray-900">${{ number_format($product['price'], 2) }}</p>

            <form action="{{ route('store.cart.add') }}" method="POST">
                @csrf
                <input type="hidden" name="variant_id" value="{{ $product['variants'][0]['id'] }}">
                <input type="number" name="quantity" value="1" min="1" class="p-2 border rounded">
                <button type="submit" class="px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg">
                    Add to Cart
                </button>
            </form>

            <a href="{{ $product['external_url'] ?? $product['url'] }}" class="inline-block px-6 py-2 mt-4 text-white bg-green-500 rounded-lg">
                Buy Now
            </a>
        </div>
    </div>
</x-app-layout>
