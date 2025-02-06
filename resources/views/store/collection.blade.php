<x-app-layout>
    <div class="px-4 py-6 mx-auto max-w-7xl">
        <h2 class="text-xl font-semibold">{{ $collection['name'] }} Collection</h2>
        <p class="text-gray-600">{{ $collection['description'] ?? '' }}</p>

        <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
            @foreach ($collection['products'] ?? [] as $product)
                <div class="p-4 bg-white rounded-lg shadow">
                    <img src="{{ $product['image_url'] }}" alt="{{ $product['name'] }}" class="object-cover w-full h-48 rounded">
                    <h3 class="mt-2 text-lg font-semibold">
                        <a href="{{ route('store.product', $product['slug']) }}" class="text-blue-600 hover:underline">
                            {{ $product['name'] }}
                        </a>
                    </h3>
                    <p class="text-gray-700">${{ number_format($product['price'], 2) }}</p>
                    <a href="{{ route('store.product', $product['slug']) }}" class="block mt-2 text-blue-500 hover:underline">
                        View Product →
                    </a>
                </div>
            @endforeach
        </div>
    </div>
</x-app-layout>
