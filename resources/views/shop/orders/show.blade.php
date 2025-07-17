@php use App\Utilities\ShopHelper; @endphp
<x-app-layout>
    <x-slot name="header">
        <h2 class="h4">Order #{{ $order->friendly_id }}</h2>
    </x-slot>
    @php
        $shopSlug = ShopHelper::getShopSlug();
    @endphp
    <div class="container py-5">
        <div class="row mb-4">
            <div class="col-md-6">
                <h5>Customer</h5>
                <p>{{ $order->customer_name }}</p>
            </div>
            <div class="col-md-6 text-md-end">
                <h5>Date &amp; Status</h5>
                <p>{{ $order->created_at->format('M j, Y g:ia') }}</p>
                <span class="badge bg-info">{{ ucfirst($order->status) }}</span>
            </div>
        </div>

        <h5>Items</h5>
        <table class="table">
            <thead>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th class="text-end">Unit Price</th>
                <th class="text-end">Line Total</th>
            </tr>
            </thead>
            <tbody>
            @foreach($order->items as $item)
                @php
                    $variant = $item->variant;
                    $product = $variant?->product;
                @endphp
                <tr>
                    <td>
                        @if($product)
                            <a href="{{ route($shopSlug.'.product', $product->slug) }}" class="text-decoration-none">
                                {{ $product->name }}
                            </a>
                        @else
                            {{ $item->name }}
                        @endif
                    </td>
                    <td>{{ $item->quantity }}</td>
                    <td class="text-end">{{ $item->unit_price->symbolFormatted() }}</td>
                    <td class="text-end">{{ $item->formatted_price }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>

        <div class="row justify-content-end">
            <div class="col-md-4">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Subtotal</span>
                        <strong>{{ $order->subtotal->symbolFormatted() }}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Shipping</span>
                        <strong>{{ $order->shipping->symbolFormatted() }}</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Tax</span>
                        <strong>{{ $order->tax->symbolFormatted() }}</strong>
                    </li>
                    @if($order->has_discount)
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Discount</span>
                            <strong>- {{ $order->discount->symbolFormatted() }}</strong>
                        </li>
                    @endif
                    <li class="list-group-item d-flex justify-content-between">
                        <span>Total</span>
                        <strong>{{ $order->total->symbolFormatted() }}</strong>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</x-app-layout>

