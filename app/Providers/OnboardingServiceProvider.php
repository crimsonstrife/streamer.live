<?php

namespace App\Providers;

use App\Services\OnboardingStepRegistrar;
use Filament\Events\ServingFilament;
use Filament\Facades\Filament;
use Illuminate\Support\ServiceProvider;
use Spatie\Onboard\Facades\Onboard;

class OnboardingServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (class_exists(Onboard::class)) {
            Filament::serving(function () {
                $panel = Filament::getCurrentPanel();
                $user = Filament::auth()?->user();

                if ($panel && $user) {
                    (new OnboardingStepRegistrar)->register($panel, $user);
                } else {
                    logger()->warning('Onboarding skipped: panel or user missing.', [
                        'panel' => $panel?->getId(),
                        'user_id' => $user?->id,
                    ]);
                }
            });
        }
    }
}
