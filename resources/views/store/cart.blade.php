<x-app-layout>
    <div class="max-w-4xl px-4 py-6 mx-auto">
        <h2 class="text-xl font-bold">Shopping Cart</h2>

        @if(empty($cart['items']))
            <p class="mt-4 text-gray-600">Your cart is empty.</p>
        @else
            <div class="mt-6 space-y-4">
                @foreach ($cart['items'] as $item)
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div class="flex items-center">
                            <img src="{{ $item['image_url'] }}" class="w-16 h-16 rounded">
                            <div class="ml-4">
                                <h3 class="text-lg font-semibold">{{ $item['name'] }}</h3>
                                <p class="text-gray-700">${{ number_format($item['unit_price']['value'], 2) }}</p>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="mt-6">
                <a href="{{ route('store.cart') }}" class="px-6 py-2 text-white bg-green-500 rounded-lg">
                    Proceed to Checkout
                </a>
            </div>
        @endif
    </div>
</x-app-layout>
