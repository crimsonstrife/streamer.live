<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Settings\TwitchSettings;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class TwitchEmbed extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        $settings = app(TwitchSettings::class);

        $block = Block::make('twitch-embed')
            ->label('Twitch Stream Embed');

        if (! $settings->enable_integration) {
            return $block
                ->schema([
                    Placeholder::make('warning')
                        ->label('')
                        ->content('⚠️ Twitch integration is disabled. Enable it in Settings to use this block.'),
                ]);
        }

        // otherwise show the normal channel input
        return $block->schema([
            TextInput::make('channel')
                ->label('Channel')
                ->placeholder('Channel name')
                ->default($settings->channel_name)
                ->required(),
            Toggle::make('chat')
                ->label('Show chat')
                ->default(false),
            Toggle::make('autoplay')
                ->label('Autoplay')
                ->default(false),
            Toggle::make('horizontal_layout')
                ->label('Chat beside stream (horizontal layout)')
                ->default(true),
        ]);
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}
