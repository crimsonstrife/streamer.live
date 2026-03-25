<?php

namespace App\Services\SelfUpdate;

use RuntimeException;
use Symfony\Component\Process\Process;

class SubprocessRunner
{
    /**
     * @param  array<int, string>  $command
     */
    public function run(array $command, ?string $workingDirectory = null): void
    {
        $process = new Process($command, $workingDirectory ?? base_path());
        $process->setTimeout(null);
        $process->run();

        if ($process->isSuccessful()) {
            return;
        }

        $output = trim($process->getOutput().$process->getErrorOutput());
        $commandString = implode(' ', $command);
        $message = "Command [{$commandString}] failed.";

        if ($output !== '') {
            $message .= " {$output}";
        }

        throw new RuntimeException($message);
    }
}
