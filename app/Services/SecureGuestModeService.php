<?php
namespace App\Services;

use App\Data\GuestData;
use App\Models\AuthObjects\Guest;
use Illuminate\Support\Facades\Auth;

class SecureGuestModeService
{
    public function enabled(): bool
    {
        return config('app.secure_guest_mode', false);
    }

    public function login(): Guest
    {
        // if we already have a guest logged in, just return it
        if ($g = Auth::guard('guest')->user()) {
            return $g;
        }

        $data  = new GuestData(request());
        $guest = Guest::createOrUpdate($data);

        Auth::guard('guest')->login($guest);

        return $guest;
    }

    public function user(): ?Guest
    {
        return Auth::guard('guest')->user();
    }
}
