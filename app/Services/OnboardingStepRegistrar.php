<?php

namespace App\Services;

use App\Models\AuthObjects\User;
use App\Settings\SiteSettings;
use Exception;
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
        $panelSlug = $panel?->getId() ?? 'admin';

        match ($panelSlug) {
            'admin' => $this->registerAdminSteps($panel, $user),
            'moderation' => $this->registerModeratorSteps($panel, $user),
            default => null,
        };
    }

    /**
     * @throws Exception
     */
    protected function registerAdminSteps(?Panel $panel = null, ?User $user = null): void
    {
        $panelSlug = $panel?->getId() ?? 'admin';

        $this->addStepOnce('site-settings', function () use ($panelSlug, $user) {
            Onboard::addStep('Set your site settings!')
                ->key('site-settings')
                ->link("/{$panelSlug}/settings/site-settings")
                ->cta('Configure')
                ->completeIf(fn (SiteSettings $setting) => $setting->isComplete())
                ->excludeIf(fn () => ! $user->can('is-super-admin') && ! $user->can('is-admin'));
        });

        $this->registerModeratorSteps($panel, $user);

        $this->addOptionalIntegrationSteps($panel, $user);
    }

    /**
     * @throws Exception
     */
    protected function registerModeratorSteps(?Panel $panel = null, ?User $user = null): void
    {
        $panelSlug = $panel?->getId() ?? 'admin';

        $this->addStepOnce('moderator-blog-comments', function () use ($panelSlug, $user) {
            Onboard::addStep('Review flagged comments')
                ->link("/{$panelSlug}/blog/comments")
                ->cta('Review')
                ->completeIf(fn () => $user->hasCompletedOnboardingStep('visited_blog_comments'))
                ->excludeIf(fn () => ! $user->can('is-super-admin') && ! $user->can('is-admin') && ! $user->can('is-moderator'));
        });

        $this->addOptionalIntegrationSteps($panel, $user);
    }

    /**
     * @throws Exception
     */
    protected function addOptionalIntegrationSteps(?Panel $panel = null, ?User $user = null): void
    {
        $panelSlug = $panel?->getId() ?? 'admin';

        foreach (['discord', 'fourthwall', 'twitch'] as $slug) {
            $this->addStepOnce("optional-integration-{$slug}", function () use ($panelSlug, $slug, $user) {
                Onboard::addStep("Visit the {$slug} integration settings")
                    ->key("visited_{$slug}_integration_page")
                    ->link("/{$panelSlug}/integrations/{$slug}-settings")
                    ->cta('See Optional Features')
                    ->completeIf(fn () => $user->hasCompletedOnboardingStep("visited_{$slug}_integration_page"))
                    ->excludeIf(fn () => ! $user->can('is-super-admin') && ! $user->can('is-admin'));
            });
        }
    }
}
