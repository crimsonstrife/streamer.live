<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StreamerWentLive
{
    use Dispatchable, SerializesModels;

    public string $username;
    public array $streamData;

    public function __construct(string $username, array $streamData)
    {
        $this->username = $username;
        $this->streamData = $streamData;
    }
}
