<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Toggle;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class FaqBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('faq')
            ->schema([
                TextInput::make('title')
                    ->label('Heading')
                    ->default('Frequently Asked Questions'),

                Repeater::make('items')
                    ->label('FAQ Items')
                    ->schema([
                        TextInput::make('question')
                            ->label('Question')
                            ->required(),
                        RichEditor::make('answer')
                            ->label('Answer')
                            ->required(),
                    ])
                    ->collapsible()
                    ->collapsed(true)
                    ->required(),

                Toggle::make('expanded_by_default')
                    ->label('Expanded by default')
                    ->default(false),
            ]);
    }

    public static function mutateData(array $data): array
    {
        // Ensure structure
        $data['title'] = $data['title'] ?? 'Frequently Asked Questions';
        $data['items'] = $data['items'] ?? [];
        $data['expanded_by_default'] = $data['expanded_by_default'] ?? false;

        return $data;
    }
}
