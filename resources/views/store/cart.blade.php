<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl fw-semibold text-dark">
            Shopping Cart
        </h2>
    </x-slot>

    <div class="py-4">
        <div class="container">
            <div class="shadow-sm card">
                <div class="card-body">
                    @if ($cart && count($cart['items']) > 0)
                        <form action="{{ route('store.cart.update') }}" method="POST">
                            @csrf
                            <table class="table align-middle table-bordered">
                                <thead class="table-light">
                                    <tr>
                                        <th>Product</th>
                                        <th>Variant</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($cart['items'] as $item)
                                        @php
                                            $variantId = $item->variant->id;
                                            $image = $item->variant->images->isNotEmpty() ? asset('storage/' . $item->variant->images->first()->local_path) : asset('images/default-product.png');
                                        @endphp
                                        <tr>
                                            <td class="d-flex align-items-center">
                                                <img src="{{ $image }}" alt="{!! html_entity_decode($item->variant->name) !!} Image" class="rounded me-3" width="60" height="60">
                                                {{ $item->variant->name }}
                                            </td>
                                            <td>{!! html_entity_decode($item->variant->name) !!}</td>
                                            <td>
                                                {{ number_format($item->variant->price, 2) }} USD
                                            </td>
                                            <td>
                                                <input type="number" name="cart[{{ $variantId }}][quantity]"
                                                    value="{{ $item->quantity }}" min="1"
                                                    class="text-center form-control w-50">
                                            </td>
                                            <td>
                                                {{ number_format(($item->quantity * $item->variant->price), 2) }}
                                                USD
                                            </td>
                                            <td>
                                                <a href="{{ route('store.cart.remove', $variantId) }}"
                                                    class="btn btn-danger btn-sm">
                                                    <i class="bi bi-trash"></i> Remove
                                                </a>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>

                            <div class="mt-4 d-flex justify-content-between">
                                <a href="{{ route('store.index') }}" class="btn btn-secondary">
                                    <i class="bi bi-arrow-left"></i> Continue Shopping
                                </a>
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-arrow-repeat"></i> Update Cart
                                </button>
                                <a href="{{ route('store.cart.checkout') }}" class="btn btn-success">
                                    <i class="bi bi-bag-check"></i> Proceed to Checkout
                                </a>
                            </div>
                        </form>
                    @else
                        <p class="text-center text-muted fs-5">Your cart is empty.</p>
                        <div class="text-center">
                            <a href="{{ route('store.index') }}" class="btn btn-primary">
                                <i class="bi bi-shop"></i> Go to Store
                            </a>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
