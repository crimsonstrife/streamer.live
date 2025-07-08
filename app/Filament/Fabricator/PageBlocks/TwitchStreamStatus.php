<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Services\TwitchService;
use App\Settings\TwitchSettings;
use App\Utilities\StreamHelper;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class TwitchStreamStatus extends PageBlock
{
    protected ?TwitchService $twitchService = null;

    protected ?StreamHelper $streamHelper = null;

    protected ?string $channel_name;

    protected bool $enabled;

    public function __construct()
    {
        $settings = app(TwitchSettings::class);

        $this->enabled = $settings->enable_integration;
        $this->channel_name = $settings->channel_name;

        if ($this->enabled) {
            // only resolve these if integration is on
            $this->twitchService = app(TwitchService::class);
            $this->streamHelper = app(StreamHelper::class);
        }
    }

    public static function getBlockSchema(): Block
    {
        $settings = app(TwitchSettings::class);

        $block = Block::make('twitch-stream-status')
            ->label('Stream Status Bar');

        if (! $settings->enable_integration) {
            return $block
                ->schema([
                    Placeholder::make('warning')
                        ->label('')
                        ->content('Twitch integration is disabled. Enable it in Settings to use this block.'),
                ]);
        }

        // otherwise show the normal channel input
        return $block
            ->schema([
                TextInput::make('channel')
                    ->label('Channel')
                    ->placeholder('Channel name')
                    ->default($settings->channel_name)
                    ->required(),
            ]);
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}
