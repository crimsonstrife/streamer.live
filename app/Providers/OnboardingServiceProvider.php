<?php

namespace App\Providers;

use App\Services\OnboardingStepRegistrar;
use Filament\Facades\Filament;
use Illuminate\Support\ServiceProvider;
use Spatie\Onboard\Facades\Onboard;

/**
 * Class OnboardingServiceProvider
 *
 * Service provider for managing onboarding steps within the application.
 */
class OnboardingServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * This method is used to bind services into the container.
     */
    public function register(): void
    {
        // No services are registered in this provider.
    }

    /**
     * Bootstrap services.
     *
     * This method is used to initialize services and perform any necessary setup.
     */
    public function boot(): void
    {
        if (class_exists(Onboard::class)) {
            Filament::serving(function () {
                $panel = Filament::getCurrentPanel();
                $user = Filament::auth()?->user();

                if ($panel && $user) {
                    (new OnboardingStepRegistrar())->register($panel, $user);
                }
            });
        }
    }
}
