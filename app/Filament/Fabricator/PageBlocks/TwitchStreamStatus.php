<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Utilities\StreamHelper;
use App\Services\TwitchService;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\App;
use Throwable;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class TwitchStreamStatus extends PageBlock
{
    protected TwitchService $twitchService;

    protected StreamHelper $streamHelper;

    public static function getBlockSchema(): Block
    {
        return Block::make('twitch-stream-status')
            ->label('Stream Status Bar')
            ->schema([
                TextInput::make('channel')
                    ->label('Channel')
                    ->placeholder('Channel name')
                    ->required(),
            ]);
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}
