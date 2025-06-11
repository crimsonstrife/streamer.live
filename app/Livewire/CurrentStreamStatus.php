<?php

namespace App\Livewire;

use Filament\Widgets\Widget;
use App\Services\TwitchService;
use Carbon\Carbon;

class CurrentStreamStatus extends Widget
{
    protected static string $view = 'livewire.current-stream-status';

    protected function getHeading(): ?string
    {
        return 'Current Stream Status';
    }

    protected function getViewData(): array
    {
        $stream = app(TwitchService::class)->getStreamData();

        if (! $stream) {
            return [
                'isLive'   => false,
                'game'     => null,
                'viewers'  => null,
                'duration' => null,
            ];
        }

        $duration = Carbon::parse($stream[0]['started_at'])
            ->diffForHumans(now(), ['parts' => 3, 'short' => true]);

        return [
            'isLive'   => true,
            'game'     => $stream[0]['game_name'],
            'viewers'  => $stream[0]['viewer_count'],
            'duration' => $duration,
        ];
    }
}
