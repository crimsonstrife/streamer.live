<?php

namespace App\Jobs;

use App\Services\OrderSyncService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleFourthwallOrder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public string $eventType,
        public array $payload
    ) {}

    public function handle(OrderSyncService $service): void
    {
        match ($this->eventType) {
            'ORDER_PLACED' => $service->upsert($this->payload['data']),
            'ORDER_UPDATED' => $service->upsert($this->payload['data']['order']),
            default => \Log::info("Unhandled Fourthwall webhook event: {$this->eventType}"),
        };
    }
}
