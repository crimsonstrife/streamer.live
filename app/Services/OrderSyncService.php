<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use App\Models\User;

class OrderSyncService
{
    public function upsert(array $data): void
    {
        $user = User::where('email', $data['email'])->first();

        $order = Order::updateOrCreate(
            ['provider_id' => $data['id']],
            [
                'friendly_id' => $data['friendlyId'] ?? null,
                'checkout_id' => $data['checkoutId'] ?? null,
                'promotion_id' => $data['promotionId'] ?? null,
                'status' => $data['status'] ?? 'PENDING',
                'email' => $data['email'],
                'username' => $data['username'] ?? null,
                'email_marketing_opt_in' => $data['emailMarketingOptIn'] ?? false,
                'message' => $data['message'] ?? null,
                'billing_address' => $data['billing']['address'] ?? [],
                'shipping_address' => $data['shipping']['address'] ?? [],
                'subtotal' => $data['amounts']['subtotal']['value'] ?? 0,
                'shipping' => $data['amounts']['shipping']['value'] ?? 0,
                'tax' => $data['amounts']['tax']['value'] ?? 0,
                'donation' => $data['amounts']['donation']['value'] ?? 0,
                'discount' => $data['amounts']['discount']['value'] ?? 0,
                'total' => $data['amounts']['total']['value'] ?? 0,
                'currency' => $data['amounts']['total']['currency'] ?? 'USD',
                'user_id' => $user?->id,
            ]
        );

        if (! empty($data['offers'])) {
            $order->items()->delete();

            foreach ($data['offers'] as $offer) {
                $variantProviderId = $offer['variant']['id'] ?? null;

                $variant = $variantProviderId
                    ? ProductVariant::where('provider_id', $variantProviderId)->first()
                    : null;

                OrderItem::create([
                    'order_id' => $order->id,
                    'provider_id' => $offer['id'],
                    'name' => $offer['name'],
                    'slug' => $offer['slug'] ?? null,
                    'description' => $offer['description'] ?? null,
                    'image_url' => $offer['primaryImage']['url'] ?? null,
                    'variant_id' => $variant?->id,
                    'sku' => $offer['variant']['sku'] ?? null,
                    'variant_name' => $offer['variant']['name'] ?? null,
                    'quantity' => $offer['variant']['quantity'] ?? 1,
                    'unit_price' => $offer['variant']['unitPrice']['amount'] ?? 0,
                    'price' => $offer['variant']['price']['amount'] ?? 0,
                    'currency' => $offer['variant']['unitPrice']['currency'] ?? 'USD',
                    'attributes' => $offer['variant']['attributes'] ?? [],
                ]);
            }
        }

        \Log::info("Order synced [{$order->friendly_id}] status={$order->status}");
    }
}
