<?php

namespace App\Filament\Resources\StreamAlertRuleResource\Pages;

use App\Filament\Resources\StreamAlertRuleResource;
use App\Settings\TwitchSettings;
use Filament\Resources\Pages\CreateRecord;

class CreateStreamAlertRule extends CreateRecord
{
    protected static string $resource = StreamAlertRuleResource::class;

    public function mount(): void
    {
        // 1) If Twitch integration is off, block access immediately
        if (! app(TwitchSettings::class)->enable_integration) {
            abort(403);
        }

        // 2) Continue with Filament's normal mount logic
        parent::mount();
    }
}
