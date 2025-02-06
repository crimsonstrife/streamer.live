<x-app-layout>
    <div class="px-4 py-6 mx-auto max-w-7xl">
        <h2 class="text-xl font-semibold">Merch Store</h2>

        <!-- Collection Links -->
        <div class="flex gap-4 mt-4">
            @foreach ($collections['results'] ?? [] as $collection)
                <a href="{{ route('store.collection', $collection['slug']) }}" class="text-blue-500 hover:underline">
                    {{ $collection['name'] }}
                </a>
            @endforeach
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
            @foreach ($products as $product)
                <div class="p-4 bg-white rounded-lg shadow">
                    <img src="{{ $product->image }}" alt="{{ $product->name }}" class="object-cover w-full h-48 rounded">
                    <h3 class="mt-2 text-lg font-semibold">
                        <a href="{{ route('store.product', $product->id) }}" class="text-blue-600 hover:underline">
                            {{ $product->title }}
                        </a>
                    </h3>
                    <p class="text-gray-700">${{ number_format($product->price, 2) }}</p>
                    <a href="{{ route('store.product', $product->id) }}" class="block mt-2 text-blue-500 hover:underline">
                        View Product →
                    </a>
                </div>
            @endforeach
        </div>
    </div>
</x-app-layout>
