<?php

namespace Tests\Unit\Services;

use App\Models\TwitchMetric;
use App\Services\TwitchService;
use App\Settings\TwitchSettings;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class TwitchServiceTest extends TestCase
{
    public function test_it_returns_the_last_known_subscriber_metric_when_no_streamer_token_is_configured(): void
    {
        config([
            'database.default' => 'sqlite',
            'database.connections.sqlite.database' => ':memory:',
            'services.twitch.enabled' => true,
            'services.twitch.channel_name' => 'streamer',
            'services.twitch.client_id' => 'client-id',
            'services.twitch.client_secret' => 'client-secret',
            'services.twitch.verify' => false,
        ]);

        app('db')->purge('sqlite');

        Schema::create('twitch_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('metric');
            $table->unsignedBigInteger('value');
            $table->timestamp('recorded_at');
            $table->timestamps();
        });

        TwitchSettings::fake([
            'enable_integration' => true,
            'channel_name' => 'streamer',
            'client_id' => 'client-id',
            'client_secret' => 'client-secret',
            'ssl_verify' => false,
            'user_access_token' => null,
            'user_refresh_token' => null,
            'user_token_expires' => null,
        ], false);

        TwitchMetric::create([
            'metric' => 'subscribers',
            'value' => 42,
            'recorded_at' => now()->subHour(),
        ]);

        Cache::put('twitch.broadcaster_id.streamer', '12345', now()->addHour());
        Http::preventStrayRequests();

        $service = app(TwitchService::class);

        $this->assertSame(42, $service->getSubscriberCount());
    }
}
