<?php

namespace Tests\Feature\Filament\Admin;

use App\Filament\Admin\Pages\Updates;
use Codedge\Updater\Contracts\SourceRepositoryTypeContract;
use Codedge\Updater\Contracts\UpdaterContract;
use GuzzleHttp\Psr7\Response as Psr7Response;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Log;
use Mockery;
use Tests\TestCase;

class UpdatesPageTest extends TestCase
{
    public function test_it_sorts_releases_semantically_and_hides_releases_without_the_package_asset(): void
    {
        config([
            'self-update.repository_types.github.package_file_name' => 'streamer-release.zip',
        ]);

        $payload = [
            [
                'tag_name' => 'v1.3.2-alpha',
                'assets' => [
                    ['name' => 'streamer-release.zip'],
                ],
            ],
            [
                'tag_name' => 'v1.10.0',
                'assets' => [
                    ['name' => 'streamer-release.zip'],
                ],
            ],
            [
                'tag_name' => 'v1.9.9',
                'assets' => [
                    ['name' => 'source-code.zip'],
                ],
            ],
            [
                'tag_name' => 'v1.2.0',
                'assets' => [
                    ['name' => 'streamer-release.zip'],
                ],
            ],
        ];

        $source = Mockery::mock(SourceRepositoryTypeContract::class);
        $source->shouldReceive('getReleases')->once()->andReturn(
            new Response(new Psr7Response(200, [], json_encode($payload)))
        );

        $updater = Mockery::mock(UpdaterContract::class);
        $updater->shouldReceive('source')->once()->andReturn($source);

        $this->app->instance(UpdaterContract::class, $updater);

        $page = new Updates();
        $page->currentVersion = 'v1.2.1-alpha';
        $page->loadReleases();

        $this->assertSame(
            ['v1.10.0', 'v1.3.2-alpha'],
            array_column($page->releases, 'tag_name')
        );
        $this->assertSame('v1.10.0', $page->availableVersion);
    }

    public function test_it_logs_invalid_regex_patterns_and_skips_unmatchable_releases(): void
    {
        config([
            'self-update.repository_types.github.package_file_name' => 'regex:release[',
        ]);

        Log::spy();

        $payload = [
            [
                'tag_name' => 'v1.3.2-alpha',
                'assets' => [
                    ['name' => 'streamer-release.zip'],
                ],
            ],
        ];

        $source = Mockery::mock(SourceRepositoryTypeContract::class);
        $source->shouldReceive('getReleases')->once()->andReturn(
            new Response(new Psr7Response(200, [], json_encode($payload)))
        );

        $updater = Mockery::mock(UpdaterContract::class);
        $updater->shouldReceive('source')->once()->andReturn($source);

        $this->app->instance(UpdaterContract::class, $updater);

        $page = new Updates();
        $page->currentVersion = 'v1.0.0';
        $page->loadReleases();

        $this->assertSame([], $page->releases);
        Log::shouldHaveReceived('error')
            ->once()
            ->withArgs(function (string $message, array $context): bool {
                return $message === 'Invalid regex pattern for update asset matching'
                    && $context['pattern'] === 'release['
                    && $context['package_file_name'] === 'regex:release[';
            });
    }
}
