<?php

namespace App\Services;

use App\Models\AuthObjects\User;
use App\Settings\SiteSettings;
use Exception;
use Filament\Panel;
use Spatie\Onboard\Facades\Onboard;

/**
 * Class OnboardingStepRegistrar
 *
 * Service class responsible for registering onboarding steps for different user roles and panels.
 */
class OnboardingStepRegistrar
{
    /**
     * @var array Keeps track of registered onboarding steps to prevent duplicate registrations.
     */
    protected static array $registered = [];

    /**
     * Adds an onboarding step only once, ensuring no duplicate steps are registered.
     *
     * @param  string  $key  The unique key for the onboarding step.
     * @param  callable  $callback  The callback function to execute for adding the step.
     */
    protected function addStepOnce(string $key, callable $callback): void
    {
        if (in_array($key, static::$registered, true)) {
            return;
        }

        static::$registered[] = $key;
        $callback();
    }

    /**
     * Registers onboarding steps based on the provided panel and user.
     *
     * @param  Panel|null  $panel  The panel instance to register steps for.
     * @param  User|null  $user  The user instance to check permissions for.
     *
     * @throws Exception If an error occurs during registration.
     */
    public function register(?Panel $panel = null, ?User $user = null): void
    {
        $panelSlug = $panel?->getId() ?? 'admin';

        match ($panelSlug) {
            'admin' => $this->registerAdminSteps($panel, $user),
            'moderation' => $this->registerModeratorSteps($panel, $user),
            default => null,
        };
    }

    /**
     * Registers onboarding steps for the admin panel.
     *
     * @param  Panel|null  $panel  The panel instance to register steps for.
     * @param  User|null  $user  The user instance to check permissions for.
     *
     * @throws Exception If an error occurs during registration.
     */
    protected function registerAdminSteps(?Panel $panel = null, ?User $user = null): void
    {
        $panelSlug = $panel?->getId() ?? 'admin';

        $this->addStepOnce('site-settings', function () use ($panelSlug, $user) {
            Onboard::addStep('Set your site settings!')
                ->link("/{$panelSlug}/settings/site-settings")
                ->cta('Configure')
                ->completeIf(fn (SiteSettings $setting) => $setting->isComplete())
                ->excludeIf(fn () => ! $user->can('is-super-admin') && ! $user->can('is-admin'));
        });

        $this->registerModeratorSteps($panel, $user);

        $this->addOptionalIntegrationSteps($panel, $user);
    }

    /**
     * Registers onboarding steps for the moderator panel.
     *
     * @param  Panel|null  $panel  The panel instance to register steps for.
     * @param  User|null  $user  The user instance to check permissions for.
     *
     * @throws Exception If an error occurs during registration.
     */
    protected function registerModeratorSteps(?Panel $panel = null, ?User $user = null): void
    {
        $panelSlug = $panel?->getId() ?? 'admin';

        $this->addStepOnce('visited-blog-comments', function () use ($panelSlug, $user) {
            Onboard::addStep('Review flagged comments')
                ->link("/{$panelSlug}/blog/comments")
                ->cta('Review')
                ->completeIf(fn () => $user->hasCompletedOnboardingStep('visited_blog_comments'))
                ->excludeIf(fn () => ! $user->can('is-super-admin') && ! $user->can('is-admin') && ! $user->can('is-moderator'));
        });

        $this->addOptionalIntegrationSteps($panel, $user);
    }

    /**
     * Registers optional integration onboarding steps for various services.
     *
     * @param  Panel|null  $panel  The panel instance to register steps for.
     * @param  User|null  $user  The user instance to check permissions for.
     *
     * @throws Exception If an error occurs during registration.
     */
    protected function addOptionalIntegrationSteps(?Panel $panel = null, ?User $user = null): void
    {
        $panelSlug = $panel?->getId() ?? 'admin';

        foreach (['discord', 'fourthwall', 'twitch'] as $slug) {
            $this->addStepOnce("optional-integration-{$slug}", function () use ($panelSlug, $slug, $user) {
                Onboard::addStep("Visit the {$slug} integration settings")
                    ->link("/{$panelSlug}/integrations/{$slug}-settings")
                    ->cta('See Optional Features')
                    ->completeIf(fn () => $user->hasCompletedOnboardingStep("visited_{$slug}_integration_page"))
                    ->excludeIf(fn () => ! $user->can('is-super-admin') && ! $user->can('is-admin'));
            });
        }
    }
}
