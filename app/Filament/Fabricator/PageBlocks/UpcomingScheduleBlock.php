<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\Event;
use App\Services\TwitchService;
use Carbon\Carbon;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Illuminate\Http\Client\ConnectionException;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class UpcomingScheduleBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('upcoming-schedule')
            ->schema([
                TextInput::make('title')
                    ->label('Heading')
                    ->default('Upcoming Schedule'),
                TextInput::make('limit')
                    ->label('Number of events')
                    ->numeric()
                    ->default(5),
                Select::make('date_format')
                    ->label('Date Format')
                    ->options([
                        'F j, Y g:i A' => now()->format('F j, Y g:i A'),
                        'l, F jS'      => now()->format('l, F jS'),
                        'M j, Y'       => now()->format('M j, Y'),
                    ])
                    ->default('F j, Y g:i A'),
            ]);
    }

    /**
     * @throws ConnectionException
     */
    public static function mutateData(array $data): array
    {
        // 1. Make sure we’ve got at least 1
        $limit  = max(1, (int) ($data['limit'] ?? 5));
        // 2. Date format for the server‐rendered time
        $format = $data['date_format'] ?? 'F j, Y g:i A';

        // 3. Try local Events first
        $local = Event::where('starts_at', '>=', now())
            ->orderBy('starts_at')
            ->limit($limit)
            ->get();

        if ($local->isNotEmpty()) {
            $raw = $local->map(fn ($e) => [
                'title' => $e->title,
                'iso'   => $e->starts_at->toIso8601String(),   // raw UTC
                'time'  => $e->starts_at->format($format),     // server‐rendered fallback
                'url'   => $e->url ?? null,
            ]);
        } else {
            // 4. Fallback to Twitch schedule
            $segments = app(TwitchService::class)->getUpcomingStreams($limit) ?? [];
            $raw = collect($segments)->map(fn ($seg) => [
                'title' => $seg['title'] ?? 'Twitch Event',
                'iso'   => Carbon::parse($seg['start_time'])->toIso8601String(),
                'time'  => Carbon::parse($seg['start_time'])->format($format),
                'url'   => null,
            ]);
        }

        // 5. Ensure we always have a title
        $data['title']  = $data['title'] ?? 'Upcoming Schedule';
        $data['events'] = $raw->toArray();

        return $data;
    }
}
