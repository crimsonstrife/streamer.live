<?php

namespace App\Jobs;

use App\Models\SponsorObjects\Donation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class HandleStripeDonationEvent implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public int $tries = 3;

    public int $backoff = 30;

    public function __construct(
        public string $eventType,
        public array $payload,
    ) {
    }

    public function handle(): void
    {
        match ($this->eventType) {
            'checkout.session.completed' => $this->handleCheckoutCompleted(),
            'charge.refunded' => $this->handleChargeRefunded(),
            'payment_intent.payment_failed' => $this->handlePaymentFailed(),
            default => Log::info('Unhandled Stripe event', ['type' => $this->eventType]),
        };
    }

    protected function handleCheckoutCompleted(): void
    {
        $sessionId = Arr::get($this->payload, 'id');
        $paymentStatus = Arr::get($this->payload, 'payment_status');

        if (! $sessionId || $paymentStatus !== 'paid') {
            return;
        }

        $amountTotal = (int) Arr::get($this->payload, 'amount_total', 0);
        $currency = strtoupper((string) Arr::get($this->payload, 'currency', 'USD'));
        $paymentIntent = Arr::get($this->payload, 'payment_intent');
        $metadata = Arr::get($this->payload, 'metadata', []);
        $customerEmail = Arr::get($this->payload, 'customer_details.email')
            ?? Arr::get($this->payload, 'customer_email');

        $attrs = [
            'stripe_payment_intent_id' => $paymentIntent,
            'amount' => $amountTotal / 100,
            'currency' => $currency,
            'status' => 'succeeded',
            'paid_at' => now(),
        ];

        $defaults = [
            'goal_id' => Arr::get($metadata, 'goal_id'),
            'user_id' => Arr::get($metadata, 'user_id') ?: null,
            'donor_name' => Arr::get($metadata, 'donor_name') ?: null,
            'donor_email' => $customerEmail,
            'is_anonymous' => Arr::get($metadata, 'is_anonymous') === '1',
            'message' => Arr::get($metadata, 'message') ?: null,
            'is_message_approved' => false,
        ];

        Donation::updateOrCreate(
            ['stripe_checkout_session_id' => $sessionId],
            array_merge($defaults, $attrs),
        );
    }

    protected function handleChargeRefunded(): void
    {
        $paymentIntent = Arr::get($this->payload, 'payment_intent');
        $chargeId = Arr::get($this->payload, 'id');

        if (! $paymentIntent) {
            return;
        }

        Donation::where('stripe_payment_intent_id', $paymentIntent)
            ->update([
                'stripe_charge_id' => $chargeId,
                'status' => 'refunded',
            ]);
    }

    protected function handlePaymentFailed(): void
    {
        $paymentIntent = Arr::get($this->payload, 'id');

        if (! $paymentIntent) {
            return;
        }

        Donation::where('stripe_payment_intent_id', $paymentIntent)
            ->update(['status' => 'failed']);
    }
}
