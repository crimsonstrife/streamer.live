<?php

namespace App\Services\SelfUpdate;

class ConfiguredCommandRunner
{
    public function __construct(
        protected SubprocessRunner $subprocessRunner
    ) {
    }

    public function runPhase(string $phase): void
    {
        $commands = config("self-update.artisan_commands.{$phase}", []);

        foreach ($commands as $signature => $command) {
            $params = is_array($command['params'] ?? null) ? $command['params'] : [];

            $this->subprocessRunner->run(
                $this->buildCommand($signature, $params),
                base_path()
            );
        }
    }

    /**
     * @param  array<int|string, mixed>  $params
     * @return array<int, string>
     */
    protected function buildCommand(string $signature, array $params): array
    {
        $command = ['php', 'artisan', $signature];

        foreach ($params as $key => $value) {
            if (is_int($key)) {
                $command[] = (string) $value;
                continue;
            }

            $option = str_starts_with($key, '--') ? $key : '--'.ltrim($key, '-');

            if (is_bool($value)) {
                if ($value) {
                    $command[] = $option;
                }

                continue;
            }

            if ($value === null) {
                continue;
            }

            $command[] = "{$option}={$value}";
        }

        return $command;
    }
}
