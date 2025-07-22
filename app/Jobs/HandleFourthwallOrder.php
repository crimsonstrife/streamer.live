<?php

namespace App\Jobs;

use App\Services\OrderSyncService;
use App\Settings\FourthwallSettings;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

/**
 * Class HandleFourthwallOrder
 *
 * Job to handle incoming Fourthwall order events and process them accordingly.
 */
class HandleFourthwallOrder implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * @var bool Indicates whether the Fourthwall integration is enabled.
     */
    protected bool $enabled;

    /**
     * HandleFourthwallOrder constructor.
     *
     * @param  string  $eventType  The type of the event received from the webhook.
     * @param  array  $payload  The payload data received from the webhook.
     */
    public function __construct(
        public string $eventType,
        public array $payload
    ) {
        $this->enabled = app(FourthwallSettings::class)->enabled;
    }

    /**
     * Handle the job to process the Fourthwall order event.
     *
     * Depending on the event type, it will either upsert the order data or log an unhandled event.
     *
     * @param  OrderSyncService  $service  The service used to sync order data.
     */
    public function handle(OrderSyncService $service): void
    {
        if ($this->enabled) {
            match ($this->eventType) {
                'ORDER_PLACED' => $service->upsert($this->payload['data']),
                'ORDER_UPDATED' => $service->upsert($this->payload['data']['order']),
                default => Log::info("Unhandled Fourthwall webhook event: {$this->eventType}"),
            };
        } else {
            Log::error('The Fourthwall integration is either disabled or improperly setup, the orders cannot be processed.');
        }
    }
}
