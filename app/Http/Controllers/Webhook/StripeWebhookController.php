<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Jobs\HandleStripeDonationEvent;
use App\Settings\StripeSettings;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;
use UnexpectedValueException;

class StripeWebhookController extends Controller
{
    protected const HANDLED_EVENTS = [
        'checkout.session.completed',
        'charge.refunded',
        'payment_intent.payment_failed',
    ];

    protected bool $enabled;

    protected ?string $secret;

    public function __construct()
    {
        $settings = app(StripeSettings::class);

        $this->enabled = $settings->enable_integration;
        $this->secret = $settings->webhook_secret;
    }

    public function __invoke(Request $request): Response
    {
        if (! $this->enabled) {
            Log::warning('Stripe webhook received while integration disabled.');

            return response('Integration disabled', 503);
        }

        if (empty($this->secret)) {
            Log::error('Stripe webhook secret is not configured.');

            return response('Not configured', 500);
        }

        $payload = $request->getContent();
        $signature = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent($payload, $signature, $this->secret);
        } catch (UnexpectedValueException $e) {
            Log::warning('Invalid Stripe webhook payload.', ['error' => $e->getMessage()]);

            return response('Invalid payload', 400);
        } catch (SignatureVerificationException $e) {
            Log::warning('Invalid Stripe webhook signature.', ['error' => $e->getMessage()]);

            return response('Invalid signature', 401);
        }

        $cacheKey = "webhook_processed_stripe_{$event->id}";

        if (Cache::has($cacheKey)) {
            return response('Already processed', 200);
        }

        Cache::put($cacheKey, true, now()->addDay());

        if (! in_array($event->type, self::HANDLED_EVENTS, true)) {
            return response('Ignored', 200);
        }

        dispatch(new HandleStripeDonationEvent(
            $event->type,
            $event->data->object->toArray(),
        ));

        return response('Accepted', 200);
    }
}
