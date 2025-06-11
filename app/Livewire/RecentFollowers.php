<?php

namespace App\Livewire;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Services\TwitchService;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;

class RecentFollowers extends StatsOverviewWidget
{
    protected ?string $heading = 'Twitch Followers & Subs';

    /**
     * @throws RequestException
     * @throws ConnectionException
     */
    protected function getCards(): array
    {
        $twitch = app(TwitchService::class);
        $days   = 7;

        $totalFollowers = $twitch->getFollowerCount();
        $newFollowers   = $twitch->getFollowerDelta($days);

        $totalSubs      = $twitch->getSubscriberCount();
        $newSubs        = $twitch->getSubscriberDelta($days);

        return [
            Stat::make('Followers', $totalFollowers)
                ->description(
                    ($newFollowers >= 0 ? '+' : '') .
                    $newFollowers .
                    " in last {$days} days"
                )
                ->icon('fas-user-plus'),

            Stat::make('Subscribers', $totalSubs)
                ->description(
                    ($newSubs >= 0 ? '+' : '') .
                    $newSubs .
                    " in last {$days} days"
                )
                ->icon('fas-star'),
        ];
    }
}
