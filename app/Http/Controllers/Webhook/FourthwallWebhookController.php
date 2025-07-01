<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Jobs\HandleFourthwallOrder;
use App\Services\FourthwallService;
use App\Services\OrderSyncService;
use App\Settings\FourthwallSettings;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use JsonException;

/**
 * Class FourthwallWebhookController
 *
 * Controller to handle incoming webhooks from the Fourthwall API.
 */
class FourthwallWebhookController extends Controller
{
    /**
     * @var bool Indicates whether the Fourthwall integration is enabled.
     */
    protected bool $enabled;

    /**
     * @var string|null The secret key used to validate webhook signatures.
     */
    protected ?string $secret;

    /**
     * FourthwallWebhookController constructor.
     * Initializes the controller with settings for the Fourthwall webhook.
     */
    public function __construct()
    {
        $this->enabled = app(FourthwallSettings::class)->enabled;

        if ($this->enabled) {
            $this->secret = app(FourthwallSettings::class)->webhook_secret;
        } else {
            $this->secret = app(FourthwallSettings::class)->webhook_secret ?? null;
        }
    }

    /**
     * Handles the incoming webhook request.
     *
     * Validates the webhook signature, processes the payload, and dispatches a job
     * to handle the webhook event.
     *
     * @param  Request  $request  The incoming HTTP request.
     * @return Response The HTTP response indicating the result of the processing.
     *
     * @throws JsonException If the payload cannot be decoded.
     */
    public function __invoke(Request $request)
    {
        // Retrieve the webhook signature from the request headers.
        $signature = $request->header('x-fourthwall-hmac-sha256');
        $secret = $this->secret;
        $payload = $request->getContent();

        // Generate the expected signature using the secret key.
        $expected = base64_encode(hash_hmac('sha256', $payload, $secret, true));

        // Validate the signature.
        if (! hash_equals($expected, $signature)) {
            Log::warning('Invalid Fourthwall webhook signature.');

            return response('Invalid signature', 401);
        }

        // Decode the JSON payload.
        $data = json_decode($payload, true, 512, JSON_THROW_ON_ERROR);
        $eventId = $data['id'] ?? null;

        // Check if the event ID is valid.
        if (! $eventId) {
            Log::warning('Invalid webhook payload received.');

            return response('Invalid', 400);
        }

        // Prevent duplicate processing of the same event.
        if (Cache::has("webhook_processed_{$eventId}")) {
            return response('Already processed', 200);
        }

        // Cache the event ID to mark it as processed.
        Cache::put("webhook_processed_{$eventId}", true, now()->addDay());

        // Dispatch a job to handle the webhook event.
        dispatch(new HandleFourthwallOrder($data['type'] ?? 'unknown', $data));

        $orderService = new OrderSyncService();
        $fourthwallService = new FourthwallService();
        // Trigger an order sync
        try {
            $fourthwallService->syncOrders($orderService);
        } catch (ConnectionException|RequestException $e) {
            Log::error('Error with order sync: '. $e->getMessage());
        }

        return response('Accepted', 200);
    }
}
