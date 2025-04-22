<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class MarkdownBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('markdown')
            ->label('Markdown Block')
            ->schema([
                MarkdownEditor::make('markdown')
                    ->label('Markdown Content')
                    ->required(),

                TextInput::make('custom_class')
                    ->label('Custom CSS Class')
                    ->nullable(),

                Toggle::make('show_preview')
                    ->label('Enable Live Preview')
                    ->default(true),

                Toggle::make('allow_unsafe_html')
                    ->label('Allow Unsafe HTML (Potentially Dangerous)')
                    ->helperText('Only enable if you trust the content fully.')
                    ->default(false),
            ]);
    }

    public static function mutateData(array $data): array
    {
        return [
            'markdown' => $data['markdown'] ?? '',
            'customClass' => $data['custom_class'] ?? '',
            'showPreview' => $data['show_preview'] ?? false,
            'allowUnsafe' => $data['allow_unsafe_html'] ?? false,
        ];
    }
}
