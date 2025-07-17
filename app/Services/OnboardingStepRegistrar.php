<?php

namespace App\Services;

use App\Models\AuthObjects\User;
use App\Settings\SiteSettings;
use Filament\Panel;
use Spatie\Onboard\Facades\Onboard;

class OnboardingStepRegistrar
{
    protected static array $registered = [];

    protected static array $registeredStepKeys = [];

    protected function addStepOnce(string $key, callable $callback): void
    {
        if (in_array($key, static::$registeredStepKeys, true)) {
            return;
        }

        static::$registeredStepKeys[] = $key;
        $callback();
    }

    public function register(?Panel $panel = null, ?User $user = null): void
    {
        $panelSlug = $panel?->getId() ?? 'default';

        match ($panelSlug) {
            'admin' => $this->registerAdminSteps($user),
            'moderator' => $this->registerModeratorSteps($user),
            default => null,
        };
    }

    protected function registerAdminSteps(?User $user): void
    {
        $this->addStepOnce('site-settings', function () use ($user) {
            Onboard::addStep('Set your site settings!')
                ->link('/admin/settings/site-settings')
                ->cta('Configure')
                ->completeIf(fn (SiteSettings $setting) => $setting->isComplete())
                ->excludeIf(fn () => ! $user->can('is-super-admin') && ! $user->can('is-admin'));
        });

        $this->registerModeratorSteps($user);

        $this->addOptionalIntegrationSteps($user);
    }

    protected function registerModeratorSteps(?User $user): void
    {
        $this->addStepOnce('moderator-reports', function () use ($user) {
            Onboard::addStep('Review flagged comments')
                ->link('/moderator/reports')
                ->cta('Review')
                ->completeIf(fn () => $user->hasCompletedOnboardingStep('visited_moderator_reports'))
                ->excludeIf(fn () => ! $user->can('is-super-admin') && ! $user->can('is-admin') && ! $user->can('is-moderator'));
        });

        $this->addOptionalIntegrationSteps($user);
    }

    protected function addOptionalIntegrationSteps(?User $user): void
    {
        foreach (['discord', 'fourthwall', 'twitch'] as $slug) {
            $this->addStepOnce("optional-integration-{$slug}", function () use ($slug, $user) {
                Onboard::addStep("Visit the {$slug} integration settings")
                    ->link("/admin/integrations/{$slug}-settings")
                    ->cta('See Optional Features')
                    ->completeIf(fn () => $user->hasCompletedOnboardingStep("visited_{$slug}_integration_page"))
                    ->excludeIf(fn () => ! $user->can('is-super-admin') && ! $user->can('is-admin'));
            });
        }
    }
}
