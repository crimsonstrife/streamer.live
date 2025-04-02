<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Jobs\HandleFourthwallOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class FourthwallWebhookController extends Controller
{
    /**
     * @throws \JsonException
     */
    public function __invoke(Request $request)
    {
        $signature = $request->header('x-fourthwall-hmac-sha256');
        $secret = config('services.fourthwall.webhook_secret');
        $payload = $request->getContent();
        $expected = base64_encode(hash_hmac('sha256', $payload, $secret, true));

        if (! hash_equals($expected, $signature)) {
            Log::warning('Invalid Fourthwall webhook signature.');

            return response('Invalid signature', 401);
        }

        $data = json_decode($payload, true, 512, JSON_THROW_ON_ERROR);
        $eventId = $data['id'] ?? null;

        if (! $eventId) {
            Log::warning('Invalid webhook payload received.');

            return response('Invalid', 400);
        }

        if (Cache::has("webhook_processed_{$eventId}")) {
            return response('Already processed', 200);
        }

        Cache::put("webhook_processed_{$eventId}", true, now()->addDay());

        dispatch(new HandleFourthwallOrder($data['type'] ?? 'unknown', $data));

        return response('Accepted', 200);
    }
}
