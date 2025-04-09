<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl fw-semibold text-dark">
            Shopping Cart
        </h2>
    </x-slot>
    @php
        use App\Models\ValueObjects\MoneyValue;$shopPrefix =  App\Utilities\ShopHelper::getShopSlug();
    @endphp
    <div class="py-4">
        <div class="container">
            <div class="shadow-sm card">
                <div class="card-body">
                    @if ($cart && count($cart['items']) > 0)
                        <form action="{{ route($shopPrefix.'.cart.update') }}" method="POST">
                            @csrf
                            <table class="table align-middle table-bordered">
                                <thead class="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Variant</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                @php
                                    $cartTotal = new MoneyValue(0, 'USD');
                                @endphp
                                @foreach ($cart['items'] as $item)
                                    @php
                                        $variantId = $item->variant->id;
                                        if ($item->variant->product->images->isNotEmpty())
                                        {
                                            $image = $item->variant->product->images->first();
                                        }
                                        else
                                        {
                                            $image = null;
                                        }
                                    @endphp
                                    <tr>
                                        <td class="d-flex align-items-center">
                                            @if ($item->variant->product->images->isNotEmpty())
                                                <img src="{!! asset($image->local_path) ?? $image->url !!}"
                                                     alt="{{ $image->alt_text }}" class="rounded me-3" width="60"
                                                     height="60">
                                            @endif
                                            {{ $item->variant->name }}
                                        </td>
                                        <td>{{ $item->variant->name }}</td>
                                        <td>
                                            {{ $item->variant->symbol_price }} USD
                                        </td>
                                        <td>
                                            <input type="number" name="cart[{{ $variantId }}][quantity]"
                                                   value="{{ $item->quantity }}" min="1"
                                                   class="text-center form-control w-50">
                                        </td>
                                        <td>
                                            {{ $item->variant->price->multiply($item->quantity)->symbolFormatted() }}
                                            USD
                                        </td>
                                        <td>
                                            <a href="{{ route($shopPrefix.'.cart.remove', $variantId) }}"
                                               class="btn btn-danger btn-sm">
                                                <i class="bi bi-trash"></i> Remove
                                            </a>
                                        </td>
                                    </tr>
                                    @php
                                        $lineTotal = $item->variant->price->multiply($item->quantity);
                                        $cartTotal = $cartTotal->sum($lineTotal);
                                    @endphp
                                @endforeach
                                <tr class="fw-bold">
                                    <td colspan="4" class="text-end">Cart Total:</td>
                                    <td colspan="2">
                                        {{ $cartTotal->symbolFormatted() }} USD
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <div class="mt-4 d-flex justify-content-between">
                                <a href="{{ route($shopPrefix.'.page') }}" class="btn btn-secondary">
                                    <i class="bi bi-arrow-left"></i> Continue Shopping
                                </a>
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-arrow-repeat"></i> Update Cart
                                </button>
                                <a href="{{ route($shopPrefix.'.cart.checkout') }}" class="btn btn-success">
                                    <i class="bi bi-bag-check"></i> Proceed to Checkout
                                </a>
                            </div>
                        </form>
                    @else
                        <p class="text-center text-muted fs-5">Your cart is empty.</p>
                        <div class="text-center">
                            <a href="{{ route($shopPrefix.'.page') }}" class="btn btn-primary">
                                <i class="bi bi-shop"></i> Go to Store
                            </a>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
