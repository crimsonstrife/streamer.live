<?php

namespace App\Http\Controllers;

use App\Models\StoreObjects\Order;
use App\Utilities\ShopHelper;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $shopSlug = ShopHelper::getShopSlug();

        // Only fetch this user’s orders, newest first
        $orders = Order::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->paginate(10);

        return view($shopSlug.'.orders.index', compact('orders'));
    }

    public function show(Order $order)
    {
        $shopSlug = ShopHelper::getShopSlug();
        // Ensure the order belongs to the signed-in user
        abort_unless($order->user_id === auth()->id(), 403);

        // eager‐load the nested relations:
        $order->load('items.variant.product');

        return view($shopSlug.'.orders.show', compact('order'));
    }
}
