<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;
use App\Models\Hero;

class HeroBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('hero')
            ->schema([
                Select::make('mode')
                    ->label('Display Mode')
                    ->options([
                        'single'   => 'Single Hero Banner',
                        'carousel' => 'Carousel of Heroes',
                    ])
                    ->default('single'),

                Select::make('heroes')
                    ->label('Select Hero(s)')
                    ->multiple()
                    ->options(Hero::query()
                        ->where('is_active', true)
                        ->orderBy('sort_order')
                        ->pluck('title', 'id')
                        ->toArray())
                    ->required(),
            ]);
    }

    public static function mutateData(array $data): array
    {
        // Turn the selected IDs into actual models for the Blade view
        $data['heroes'] = Hero::query()
            ->whereIn('id', $data['heroes'] ?? [])
            ->orderBy('sort_order')
            ->get();

        return $data;
    }
}
