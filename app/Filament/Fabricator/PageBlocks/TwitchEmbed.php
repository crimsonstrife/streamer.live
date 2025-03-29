<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class TwitchEmbed extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('twitch-embed')
            ->schema([
                TextInput::make('channel')
                    ->label('Channel')
                    ->placeholder('Channel name')
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
