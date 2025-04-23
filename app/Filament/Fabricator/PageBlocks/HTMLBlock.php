<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Mews\Purifier\Facades\Purifier;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class HTMLBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('custom-html')
            ->label('Custom HTML')
            ->schema([
                Textarea::make('html')
                    ->label('HTML Code')
                    ->rows(10)
                    ->required()
                    ->helperText('Enter safe HTML. Scripts are stripped unless explicitly allowed.')
                    ->afterStateHydrated(function ($state, callable $set, callable $get) {
                        if ($state && ! $get('allow_scripts')) {
                            $set('html', Purifier::clean($state));
                        }
                    })
                    ->dehydrateStateUsing(function ($state, $get) {
                        $config = $get('allow_scripts') ? 'default_allow_scripts' : null;

                        return Purifier::clean($state, $config);
                    }),

                Toggle::make('allow_scripts')
                    ->label('Allow <script> tags (Unsafe)')
                    ->helperText('⚠️ Allowing scripts can create security vulnerabilities. Only enable if you trust the content.')
                    ->default(false),

                Toggle::make('use_container')
                    ->label('Wrap in Bootstrap Container')
                    ->default(true),

                Select::make('background')
                    ->label('Background Color')
                    ->options([
                        'none' => 'None',
                        'bg-light' => 'Light',
                        'bg-dark text-white' => 'Dark',
                        'bg-primary text-white' => 'Primary',
                        'bg-secondary' => 'Secondary',
                    ])
                    ->default('none'),

                Select::make('padding')
                    ->label('Padding')
                    ->options([
                        'py-0' => 'No Padding',
                        'py-3' => 'Small (py-3)',
                        'py-5' => 'Medium (py-5)',
                        'py-7' => 'Large (py-7)',
                    ])
                    ->default('py-5'),
            ]);
    }

    public static function mutateData(array $data): array
    {
        return [
            'html' => $data['html'] ?? '',
            'use_container' => $data['use_container'] ?? false,
            'background' => $data['background'] ?? 'none',
            'padding' => $data['padding'] ?? 'py-0',
        ];
    }
}
