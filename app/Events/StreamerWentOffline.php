<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StreamerWentOffline
{
    use Dispatchable, SerializesModels;

    public string $username;

    public function __construct(string $username)
    {
        $this->username = $username;
    }
}
