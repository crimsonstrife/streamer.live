@php
    // Get the authenticated user
    use App\Models\StoreObjects\Order;use App\Utilities\ShopHelper;$user = auth()->user();

    // Get orders for the current user
    $orders = Order::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
    $shopSlug = ShopHelper::getShopSlug();
@endphp
<x-card class="mb-4">
    <h5>Recent Orders</h5>
    @forelse($orders as $order)
        <div class="d-flex justify-content-between py-2 border-bottom">
            <div>#{{ $order->friendly_id }} • {{ $order->created_at->format('M j, Y') }}</div>
            <div>
                <span class="badge bg-info">{{ ucfirst($order->status) }}</span>
                <a href="{{ route($shopSlug.'.orders.show', $order) }}" class="ms-2">View</a>
            </div>
        </div>
    @empty
        <p class="text-muted small">You haven’t placed any orders yet.</p>
    @endforelse
    <p class="small text-muted">View your past purchases and order status.</p>
    <a href="{{ route($shopSlug.'.orders.index') }}" class="btn btn-sm btn-primary">See Orders</a>
</x-card>
