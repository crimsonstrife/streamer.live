<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Services\TwitchService;
use App\Models\Event;                     // fallback Events model
use Carbon\Carbon;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Log;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class NextStreamCountdownBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('next-stream-countdown')
            ->schema([
                TextInput::make('title')
                    ->label('Heading')
                    ->default('Next Stream In'),
                Select::make('style')
                    ->label('Display Style')
                    ->options([
                        'digital'  => 'Digital Clock',
                        'progress' => 'Progress Bar',
                    ])
                    ->default('digital'),
            ]);
    }

    /**
     * @throws ConnectionException
     */
    public static function mutateData(array $data): array
    {
        // 1) Look for the very next local Event
        $nextLocal = Event::where('starts_at', '>=', now())
            ->orderBy('starts_at')
            ->first();

        if ($nextLocal) {
            $when  = $nextLocal->starts_at;
            $label = $nextLocal->title;
        } else {
            // 2) Fallback to TwitchService
            $seg = app(TwitchService::class)->getNextScheduledStream();
            if ($seg && ! empty($seg['start_time'])) {
                $when  = Carbon::parse($seg['start_time']);
                $label = $seg['title'] ?? null;
            } else {
                $when  = null;
                $label = null;
            }
        }

        if ($when && $when->isFuture()) {
            $data['target_iso'] = $when->toIso8601String();
            $data['label']      = $label;
        } else {
            $data['target_iso'] = null;
            $data['label']      = null;
        }

        // ensure title & style
        $data['title'] = $data['title'] ?? 'Next Stream In';
        $data['style'] = $data['style'] ?? 'digital';

        return $data;
    }
}
