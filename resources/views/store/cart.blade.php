<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            Shopping Cart
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="p-6 overflow-hidden bg-white shadow-xl sm:rounded-lg">

                @if (session('cart') && count(session('cart')) > 0)
                    <form action="{{ route('store.cart.update') }}" method="POST">
                        @csrf
                        <table class="w-full border border-collapse border-gray-300 table-auto">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="px-4 py-2 border border-gray-300">Product</th>
                                    <th class="px-4 py-2 border border-gray-300">Variant</th>
                                    <th class="px-4 py-2 border border-gray-300">Price</th>
                                    <th class="px-4 py-2 border border-gray-300">Quantity</th>
                                    <th class="px-4 py-2 border border-gray-300">Total</th>
                                    <th class="px-4 py-2 border border-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach (session('cart') as $variantId => $item)
                                    <tr>
                                        <td class="flex items-center px-4 py-2 border border-gray-300">
                                            <img src="{{ $item['image'] ?? asset('images/default-product.png') }}"
                                                alt="{{ $item['name'] }}" class="object-cover w-16 h-16 mr-4 rounded">
                                            {{ $item['name'] }}
                                        </td>
                                        <td class="px-4 py-2 border border-gray-300">{{ $item['variant_name'] }}</td>
                                        <td class="px-4 py-2 border border-gray-300">
                                            {{ number_format($item['price'], 2) }} {{ $item['currency'] }}
                                        </td>
                                        <td class="px-4 py-2 border border-gray-300">
                                            <input type="number" name="cart[{{ $variantId }}][quantity]"
                                                value="{{ $item['quantity'] }}" min="1"
                                                class="w-16 text-center border border-gray-300 rounded">
                                        </td>
                                        <td class="px-4 py-2 border border-gray-300">
                                            {{ number_format($item['quantity'] * $item['price'], 2) }} {{ $item['currency'] }}
                                        </td>
                                        <td class="px-4 py-2 border border-gray-300">
                                            <a href="{{ route('store.cart.remove', $variantId) }}"
                                                class="px-3 py-1 text-white bg-red-500 rounded">Remove</a>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>

                        <div class="flex justify-between mt-6">
                            <a href="{{ route('store.index') }}" class="px-4 py-2 text-white bg-gray-500 rounded">
                                Continue Shopping
                            </a>
                            <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded">
                                Update Cart
                            </button>
                            <a href="{{ route('store.cart.checkout') }}" class="px-4 py-2 text-white bg-green-500 rounded">
                                Proceed to Checkout
                            </a>
                        </div>
                    </form>
                @else
                    <p class="text-gray-500">Your cart is empty.</p>
                    <a href="{{ route('store.index') }}" class="inline-block px-4 py-2 mt-4 text-white bg-blue-500 rounded">
                        Go to Store
                    </a>
                @endif

            </div>
        </div>
    </div>
</x-app-layout>
