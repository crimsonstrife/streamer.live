<?php

namespace Tests\Feature\Console;

use Symfony\Component\Process\Process;
use Tests\TestCase;

class ArtisanBootSmokeTest extends TestCase
{
    public function test_artisan_list_still_boots_when_the_cache_store_is_unavailable(): void
    {
        $process = new Process(
            ['php', 'artisan', 'list', '--raw'],
            base_path(),
            [
                'APP_ENV' => 'testing',
                'CACHE_STORE' => 'redis',
                'CACHE_DRIVER' => 'redis',
                'REDIS_CLIENT' => 'predis',
                'REDIS_HOST' => '127.0.0.1',
                'REDIS_PORT' => '6379',
                'QUEUE_CONNECTION' => 'sync',
                'SESSION_DRIVER' => 'array',
                'TELESCOPE_ENABLED' => 'false',
                'PULSE_ENABLED' => 'false',
            ]
        );

        $process->setTimeout(60);
        $process->run();

        $this->assertTrue(
            $process->isSuccessful(),
            trim($process->getErrorOutput()."\n".$process->getOutput())
        );
        $this->assertStringContainsString('app:self-update', $process->getOutput());
    }
}
