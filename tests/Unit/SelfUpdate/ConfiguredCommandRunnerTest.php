<?php

namespace Tests\Unit\SelfUpdate;

use App\Services\SelfUpdate\ConfiguredCommandRunner;
use App\Services\SelfUpdate\SubprocessRunner;
use Mockery;
use Tests\TestCase;

class ConfiguredCommandRunnerTest extends TestCase
{
    public function test_it_runs_configured_commands_in_order(): void
    {
        config([
            'self-update.artisan_commands.post_update' => [
                'updater:first' => [
                    'class' => null,
                    'params' => [],
                ],
                'updater:second' => [
                    'class' => null,
                    'params' => [
                        'force' => true,
                        'step' => 'cleanup',
                    ],
                ],
            ],
        ]);

        $subprocessRunner = Mockery::mock(SubprocessRunner::class);
        $subprocessRunner->shouldReceive('run')
            ->once()
            ->with(['php', 'artisan', 'updater:first'], base_path())
            ->ordered();
        $subprocessRunner->shouldReceive('run')
            ->once()
            ->with(['php', 'artisan', 'updater:second', '--force', '--step=cleanup'], base_path())
            ->ordered();

        $runner = new ConfiguredCommandRunner($subprocessRunner);
        $runner->runPhase('post_update');
    }
}
