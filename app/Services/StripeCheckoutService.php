<?php

namespace App\Services;

use App\Models\AuthObjects\User;
use App\Models\SponsorObjects\Donation;
use App\Models\SponsorObjects\Goal;
use App\Settings\StripeSettings;
use RuntimeException;
use Stripe\Checkout\Session;
use Stripe\StripeClient;

class StripeCheckoutService
{
    protected StripeClient $client;

    protected StripeSettings $settings;

    public function __construct()
    {
        $this->settings = app(StripeSettings::class);

        if (! $this->settings->enable_integration) {
            throw new RuntimeException('Stripe integration is disabled.');
        }

        if (empty($this->settings->secret_key)) {
            throw new RuntimeException('Stripe secret key is not configured.');
        }

        $this->client = new StripeClient($this->settings->secret_key);
    }

    public function createSession(Goal $goal, array $input, ?User $user = null): Session
    {
        $amountDollars = (float) $input['amount'];
        $cents = (int) round($amountDollars * 100);

        $donorName = $input['donor_name'] ?? $user?->name;
        $donorEmail = $input['donor_email'] ?? $user?->email;
        $isAnonymous = (bool) ($input['is_anonymous'] ?? false);
        $message = isset($input['message']) ? mb_substr((string) $input['message'], 0, 500) : null;
        $currency = strtolower($goal->currency ?? $this->settings->currency ?? 'usd');

        $metadata = [
            'goal_id' => (string) $goal->id,
            'user_id' => $user?->id ? (string) $user->id : '',
            'donor_name' => $donorName ?? '',
            'is_anonymous' => $isAnonymous ? '1' : '0',
            'message' => $message ?? '',
        ];

        $params = [
            'mode' => 'payment',
            'line_items' => [[
                'price_data' => [
                    'currency' => $currency,
                    'product_data' => [
                        'name' => "Sponsor: {$goal->title}",
                    ],
                    'unit_amount' => $cents,
                ],
                'quantity' => 1,
            ]],
            'metadata' => $metadata,
            'payment_intent_data' => [
                'metadata' => $metadata,
            ],
            'success_url' => route('sponsor.success').'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('sponsor.cancel'),
        ];

        if (! empty($donorEmail)) {
            $params['customer_email'] = $donorEmail;
        }

        $session = $this->client->checkout->sessions->create($params);

        Donation::create([
            'goal_id' => $goal->id,
            'user_id' => $user?->id,
            'stripe_checkout_session_id' => $session->id,
            'amount' => $amountDollars,
            'currency' => strtoupper($currency),
            'donor_name' => $donorName,
            'donor_email' => $donorEmail,
            'is_anonymous' => $isAnonymous,
            'message' => $message,
            'is_message_approved' => false,
            'status' => 'pending',
        ]);

        return $session;
    }
}
