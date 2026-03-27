<?php

declare(strict_types=1);

namespace Tests\Feature\Console;

use Illuminate\Support\Carbon;
use Tests\TestCase;

class PruneSelfUpdateLogsCommandTest extends TestCase
{
    protected string $logDirectory;

    protected string $currentLogPath;

    protected string $oldArchivePath;

    protected function setUp(): void
    {
        parent::setUp();

        $this->logDirectory = sys_get_temp_dir().'/self-update-logs-'.uniqid();
        mkdir($this->logDirectory, 0777, true);

        $this->currentLogPath = $this->logDirectory.'/self-update.log';
        $this->oldArchivePath = $this->logDirectory.'/self-update-20240101_000000.log';

        Carbon::setTestNow('2026-03-25 12:00:00');

        config([
            'self-update.log_file' => $this->currentLogPath,
            'self-update.log_pruning.enabled' => true,
            'self-update.log_pruning.max_size_kb' => 1,
            'self-update.log_pruning.retention_days' => 14,
        ]);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        foreach (glob($this->logDirectory.'/*') ?: [] as $file) {
            @unlink($file);
        }

        if (is_dir($this->logDirectory)) {
            @rmdir($this->logDirectory);
        }

        parent::tearDown();
    }

    public function test_it_rotates_an_oversized_log_and_prunes_stale_archives(): void
    {
        file_put_contents($this->currentLogPath, str_repeat('A', 2048));
        file_put_contents($this->oldArchivePath, 'old archive');
        touch($this->oldArchivePath, Carbon::now()->subDays(30)->timestamp);

        $this->artisan('logs:prune-self-update')
            ->expectsOutputToContain('Archived oversized self-update log')
            ->expectsOutputToContain('Pruned 1 archived self-update log(s).')
            ->assertExitCode(0);

        $rotatedArchivePath = $this->logDirectory.'/self-update-20260325_120000.log';

        $this->assertFileExists($rotatedArchivePath);
        $this->assertSame(2048, filesize($rotatedArchivePath));
        $this->assertFileExists($this->currentLogPath);
        $this->assertSame(0, filesize($this->currentLogPath));
        $this->assertFileDoesNotExist($this->oldArchivePath);
    }

    public function test_it_leaves_small_logs_untouched(): void
    {
        file_put_contents($this->currentLogPath, 'small log');

        $this->artisan('logs:prune-self-update')
            ->doesntExpectOutputToContain('Archived oversized self-update log')
            ->assertExitCode(0);

        $this->assertSame('small log', (string) file_get_contents($this->currentLogPath));
        $this->assertFileDoesNotExist($this->logDirectory.'/self-update-20260325_120000.log');
    }

    public function test_it_clamps_non_positive_retention_periods(): void
    {
        $recentArchivePath = $this->logDirectory.'/self-update-20260324_120000.log';

        config([
            'self-update.log_pruning.retention_days' => 0,
        ]);

        file_put_contents($this->oldArchivePath, 'old archive');
        file_put_contents($recentArchivePath, 'recent archive');
        touch($this->oldArchivePath, Carbon::now()->subDays(30)->timestamp);
        touch($recentArchivePath, Carbon::now()->subHours(12)->timestamp);

        $this->artisan('logs:prune-self-update')
            ->expectsOutputToContain('Pruned 1 archived self-update log(s).')
            ->assertExitCode(0);

        $this->assertFileDoesNotExist($this->oldArchivePath);
        $this->assertFileExists($recentArchivePath);
    }
}
