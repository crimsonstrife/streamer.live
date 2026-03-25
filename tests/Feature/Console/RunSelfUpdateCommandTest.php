<?php

namespace Tests\Feature\Console;

use App\Services\SelfUpdate\ConfiguredCommandRunner;
use App\Services\SelfUpdate\InstalledVersionStore;
use App\Services\SelfUpdate\SelfUpdateStatusStore;
use Codedge\Updater\Contracts\SourceRepositoryTypeContract;
use Codedge\Updater\Contracts\UpdaterContract;
use Codedge\Updater\Models\Release;
use Mockery;
use RuntimeException;
use Tests\TestCase;

class RunSelfUpdateCommandTest extends TestCase
{
    protected string $environmentPath;
    protected string $statusPath;

    protected function setUp(): void
    {
        parent::setUp();

        $path = tempnam(sys_get_temp_dir(), 'self-update-env-');
        $this->environmentPath = $path === false ? sys_get_temp_dir().'/self-update-env' : $path;

        file_put_contents(
            $this->environmentPath,
            "APP_NAME=Test\nSELF_UPDATER_VERSION_INSTALLED=v1.2.1-alpha\n"
        );

        $statusPath = tempnam(sys_get_temp_dir(), 'self-update-status-');
        $this->statusPath = $statusPath === false ? sys_get_temp_dir().'/self-update-status.json' : $statusPath;

        config([
            'self-update.status_file' => $this->statusPath,
        ]);
    }

    protected function tearDown(): void
    {
        if (file_exists($this->environmentPath)) {
            unlink($this->environmentPath);
        }

        if (file_exists($this->statusPath)) {
            unlink($this->statusPath);
        }

        parent::tearDown();
    }

    public function test_it_persists_the_applied_version_after_a_successful_update(): void
    {
        $release = (new Release())
            ->setVersion('v1.3.2-alpha')
            ->setRelease('streamer-release.zip');

        $source = Mockery::mock(SourceRepositoryTypeContract::class);
        $source->shouldReceive('fetch')->once()->with('v1.3.2-alpha')->andReturn($release);
        $source->shouldReceive('update')->once()->with($release)->andReturn(true);

        $updater = Mockery::mock(UpdaterContract::class);
        $updater->shouldReceive('source')->once()->andReturn($source);

        $runner = Mockery::mock(ConfiguredCommandRunner::class);
        $runner->shouldReceive('runPhase')->once()->with('pre_update')->ordered();
        $runner->shouldReceive('runPhase')->once()->with('post_update')->ordered();

        $this->app->instance(UpdaterContract::class, $updater);
        $this->app->instance(ConfiguredCommandRunner::class, $runner);
        $this->app->instance(InstalledVersionStore::class, new InstalledVersionStore($this->environmentPath));

        $this->artisan('app:self-update', [
            'version' => 'v1.3.2-alpha',
        ])->assertExitCode(0);

        $this->assertStringContainsString(
            'SELF_UPDATER_VERSION_INSTALLED=v1.3.2-alpha',
            (string) file_get_contents($this->environmentPath)
        );

        $status = $this->app->make(SelfUpdateStatusStore::class)->read();

        $this->assertSame('succeeded', $status['state']);
        $this->assertSame('v1.3.2-alpha', $status['version']);
        $this->assertNull($status['message']);
    }

    public function test_it_does_not_persist_the_new_version_when_post_update_hooks_fail(): void
    {
        $release = (new Release())
            ->setVersion('v1.3.2-alpha')
            ->setRelease('streamer-release.zip');

        $source = Mockery::mock(SourceRepositoryTypeContract::class);
        $source->shouldReceive('fetch')->once()->with('v1.3.2-alpha')->andReturn($release);
        $source->shouldReceive('update')->once()->with($release)->andReturn(true);

        $updater = Mockery::mock(UpdaterContract::class);
        $updater->shouldReceive('source')->once()->andReturn($source);

        $runner = Mockery::mock(ConfiguredCommandRunner::class);
        $runner->shouldReceive('runPhase')->once()->with('pre_update')->ordered();
        $runner->shouldReceive('runPhase')->once()->with('post_update')->ordered()
            ->andThrow(new RuntimeException('Post-update hook failed.'));

        $this->app->instance(UpdaterContract::class, $updater);
        $this->app->instance(ConfiguredCommandRunner::class, $runner);
        $this->app->instance(InstalledVersionStore::class, new InstalledVersionStore($this->environmentPath));

        $this->artisan('app:self-update', [
            'version' => 'v1.3.2-alpha',
        ])->assertExitCode(1);

        $this->assertStringContainsString(
            'SELF_UPDATER_VERSION_INSTALLED=v1.2.1-alpha',
            (string) file_get_contents($this->environmentPath)
        );

        $status = $this->app->make(SelfUpdateStatusStore::class)->read();

        $this->assertSame('failed', $status['state']);
        $this->assertSame('v1.3.2-alpha', $status['version']);
        $this->assertSame('Post-update hook failed.', $status['message']);
    }
}
