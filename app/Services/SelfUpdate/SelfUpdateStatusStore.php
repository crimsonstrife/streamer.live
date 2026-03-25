<?php

namespace App\Services\SelfUpdate;

use Illuminate\Filesystem\Filesystem;
use RuntimeException;

class SelfUpdateStatusStore
{
    public function __construct(
        protected Filesystem $files
    ) {
    }

    /**
     * @return array{state: string, version: ?string, message: ?string, updated_at: ?string}
     */
    public function read(): array
    {
        $path = $this->path();

        if (! $this->files->exists($path)) {
            return $this->defaultPayload();
        }

        $decoded = json_decode($this->files->get($path), true);

        if (! is_array($decoded)) {
            return $this->defaultPayload();
        }

        return [
            'state' => (string) ($decoded['state'] ?? 'idle'),
            'version' => isset($decoded['version']) ? (string) $decoded['version'] : null,
            'message' => isset($decoded['message']) ? (string) $decoded['message'] : null,
            'updated_at' => isset($decoded['updated_at']) ? (string) $decoded['updated_at'] : null,
        ];
    }

    public function isBusy(): bool
    {
        return in_array($this->read()['state'], ['queued', 'running'], true);
    }

    public function markQueued(?string $version): void
    {
        $this->write('queued', $version);
    }

    public function markRunning(?string $version): void
    {
        $this->write('running', $version);
    }

    public function markSucceeded(string $version): void
    {
        $this->write('succeeded', $version);
    }

    public function markFailed(?string $version, string $message): void
    {
        $this->write('failed', $version, $message);
    }

    protected function path(): string
    {
        return (string) config('self-update.status_file', storage_path('app/self-update-status.json'));
    }

    protected function write(string $state, ?string $version, ?string $message = null): void
    {
        $path = $this->path();
        $directory = dirname($path);

        $this->files->ensureDirectoryExists($directory);

        $payload = json_encode([
            'state' => $state,
            'version' => $version,
            'message' => $message,
            'updated_at' => now()->toIso8601String(),
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        if ($payload === false) {
            throw new RuntimeException('Unable to encode self-update status payload.');
        }

        if ($this->files->put($path, $payload.PHP_EOL) === false) {
            throw new RuntimeException("Unable to persist self-update status to [{$path}].");
        }
    }

    /**
     * @return array{state: string, version: ?string, message: ?string, updated_at: ?string}
     */
    protected function defaultPayload(): array
    {
        return [
            'state' => 'idle',
            'version' => null,
            'message' => null,
            'updated_at' => null,
        ];
    }
}
