<?php

namespace App\Filament\Widgets;

use App\Services\OnboardingStepRegistrar;
use Filament\Facades\Filament;
use Filament\Widgets\Widget;
use Illuminate\Support\Facades\Log;
use Spatie\Onboard\Facades\Onboard;

class AccountWidget extends Widget
{
    protected static ?int $sort = -3;
    protected static bool $stepsRegistered = false;
    protected static bool $isLazy = false; // must be false so mount() runs immediately
    protected static string $view = 'filament.widgets.account-widget';

    public function mount(): void
    {
        $user = Filament::auth()?->user();
        $panel = Filament::getCurrentPanel();

        if (static::$stepsRegistered) {
            return;
        }

        $user = Filament::auth()?->user();
        $panel = Filament::getCurrentPanel();

        if ($user && $panel) {
            Log::info('Registering onboarding from AccountWidget', [
                'user_id' => $user->id,
                'panel' => $panel->getId(),
            ]);
            (new OnboardingStepRegistrar)->register($panel, $user);
            static::$stepsRegistered = true;
        } else {
            Log::warning('Onboarding skipped in widget: user or panel missing', [
                'user' => $user,
                'panel' => $panel?->getId(),
            ]);
        }
    }
}
