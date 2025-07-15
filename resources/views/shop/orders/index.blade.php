<x-app-layout>
    <x-slot name="header">
        <h2 class="h4">My Orders</h2>
    </x-slot>
    @php
        use App\Utilities\ShopHelper;$shopSlug = ShopHelper::getShopSlug();
    @endphp
    <div class="container py-5">
        @if($orders->count())
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th class="text-end">Total</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @foreach($orders as $order)
                    <tr>
                        <td>{{ $order->friendly_id }}</td>
                        <td>{{ $order->created_at->format('M j, Y') }}</td>
                        <td><span class="badge bg-info">{{ ucfirst($order->status) }}</span></td>
                        <td class="text-end">{{ $order->formatted_total }}</td>
                        <td>
                            <a href="{{ route($shopSlug.'.orders.show', $order) }}"
                               class="btn btn-sm btn-outline-primary">
                                View
                            </a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>

            <div class="d-flex justify-content-center">
                {{ $orders->links('vendor.pagination.bootstrap-5') }}
            </div>
        @else
            <p class="text-muted">You have not placed any orders yet.</p>
        @endif
    </div>
</x-app-layout>
