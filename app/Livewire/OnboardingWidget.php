<?php

namespace App\Livewire;

use Filament\Widgets\Widget;

class OnboardingWidget extends Widget
{
    protected static string $view = 'livewire.onboarding-widget';

    protected static ?string $heading = 'Setup Guide';
}
