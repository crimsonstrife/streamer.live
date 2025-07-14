@php
    // Get the authenticated user
    $user = auth()->user();

    // Get orders for the current user
    $orders = \App\Models\StoreObjects\Order::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

@endphp
<x-card class="mb-4">
    <h5>Recent Orders</h5>
    @forelse($orders as $order)
        <div class="d-flex justify-content-between py-2 border-bottom">
            <div>#{{ $order->friendly_id }} • {{ $order->created_at->format('M j, Y') }}</div>
            <div>
                <span class="badge bg-info">{{ ucfirst($order->status) }}</span>
                <a href="#" class="ms-2">View</a> <!-- TODO: Setup route to let users view orders -->
            </div>
        </div>
    @empty
        <p class="text-muted small">You haven’t placed any orders yet.</p>
    @endforelse
</x-card>
