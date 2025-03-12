<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class SecureGuestMode extends Facade
{
    public static function enabled(): true
    {
        // TODO: Implement this to be configurable
        return true;
    }

    protected static function getFacadeAccessor(): string
    {
        return 'secure-guest-mode';
    }
}
