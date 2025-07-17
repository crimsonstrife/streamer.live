<?php

namespace App\Filament\Widgets;

use App\Services\OnboardingStepRegistrar;
use Exception;
use Filament\Facades\Filament;
use Filament\Widgets\Widget;
use Illuminate\Support\Facades\Log;

/**
 * Class AccountWidget
 *
 * A Filament widget responsible for managing user onboarding steps within the account panel.
 * This widget ensures onboarding steps are registered for authenticated users and their respective panels.
 */
class AccountWidget extends Widget
{
    /**
     * @var int|null Determines the sort order of the widget. Lower values appear earlier.
     */
    protected static ?int $sort = -3;

    /**
     * @var bool Indicates whether onboarding steps have been registered.
     */
    protected static bool $stepsRegistered = false;

    /**
     * @var bool Specifies whether the widget should load lazily. Must be false for immediate execution.
     */
    protected static bool $isLazy = false;

    /**
     * @var string The view file associated with the widget.
     */
    protected static string $view = 'filament.widgets.account-widget';

    /**
     * Mounts the widget and registers onboarding steps for the authenticated user and panel.
     *
     * This method is executed immediately when the widget is loaded.
     *
     * @throws Exception If an error occurs during onboarding step registration.
     */
    public function mount(): void
    {
        // Retrieve the authenticated user and current panel.
        $user = Filament::auth()?->user();
        $panel = Filament::getCurrentPanel();

        // Log and skip onboarding if user or panel is missing.
        if (! $user || ! $panel) {
            Log::debug('Onboarding skipped in widget: user or panel missing', [
                'user' => $user,
                'panel' => $panel?->getId(),
            ]);

            return;
        }

        // Generate a unique key for the user and panel combination.
        $key = spl_object_hash($user).'|'.$panel->getId();

        // Static array to track registered users and panels.
        static $registeredUsers = [];

        // Skip registration if the user and panel combination is already registered.
        if (in_array($key, $registeredUsers, true)) {
            return;
        }

        // Log the registration process for debugging purposes.
        Log::debug('Registering onboarding from AccountWidget', [
            'user_id' => $user->id,
            'panel' => $panel->getId(),
        ]);

        // Register onboarding steps using the OnboardingStepRegistrar service.
        (new OnboardingStepRegistrar)->register($panel, $user);

        // Mark the user and panel combination as registered.
        $registeredUsers[] = $key;
    }
}
