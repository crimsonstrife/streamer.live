<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\SharedObjects\BrandPartner;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class BrandPartnersBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('brand-partners')
            ->label('Brand Partners')
            ->schema([
                TextInput::make('title')
                    ->label('Title'),

                Textarea::make('intro')
                    ->rows(3),

                Select::make('source')
                    ->options([
                        'automatic' => 'Automatic',
                        'manual' => 'Manual selection',
                    ])
                    ->default('automatic')
                    ->native(false)
                    ->required(),

                Select::make('partner_ids')
                    ->label('Partners')
                    ->options(fn (): array => BrandPartner::query()->ordered()->pluck('name', 'id')->all())
                    ->multiple()
                    ->searchable()
                    ->preload()
                    ->visible(fn ($get): bool => $get('source') === 'manual'),

                Select::make('types')
                    ->label('Included Types')
                    ->options([
                        'partner' => 'Partner',
                        'affiliate' => 'Affiliate',
                        'sponsor' => 'Sponsor',
                    ])
                    ->multiple()
                    ->searchable()
                    ->preload()
                    ->visible(fn ($get): bool => $get('source') === 'automatic'),

                Toggle::make('featured_only')
                    ->default(false)
                    ->visible(fn ($get): bool => $get('source') === 'automatic'),

                TextInput::make('limit')
                    ->numeric()
                    ->default(6)
                    ->minValue(1)
                    ->visible(fn ($get): bool => $get('source') === 'automatic'),

                Select::make('layout')
                    ->options([
                        'cards' => 'Cards',
                        'logos' => 'Logo wall',
                        'compact' => 'Compact list',
                    ])
                    ->default('cards')
                    ->native(false),

                Select::make('columns')
                    ->options([
                        2 => '2 columns',
                        3 => '3 columns',
                        4 => '4 columns',
                    ])
                    ->default(3)
                    ->native(false),

                Toggle::make('show_excerpt')
                    ->default(true),

                Toggle::make('show_cta')
                    ->default(true),

                Toggle::make('show_disclosure')
                    ->default(true),
            ]);
    }

    public static function mutateData(array $data): array
    {
        $partners = static::resolvePartners($data);

        return array_merge($data, [
            'partners' => $partners,
        ]);
    }

    protected static function resolvePartners(array $data)
    {
        $source = $data['source'] ?? 'automatic';

        $query = BrandPartner::query()
            ->with([
                'links' => fn ($query) => $query->active()->ordered(),
                'media',
            ])
            ->displayable();

        if ($source === 'manual') {
            $ids = array_map('intval', $data['partner_ids'] ?? []);

            if ($ids === []) {
                return collect();
            }

            $records = $query->whereIn('id', $ids)->get();
            $order = collect($ids)->flip();

            return $records
                ->sortBy(fn (BrandPartner $partner) => $order[$partner->id] ?? PHP_INT_MAX)
                ->values();
        }

        $types = array_filter($data['types'] ?? []);
        $limit = max(1, (int) ($data['limit'] ?? 6));

        $query
            ->ofTypes($types)
            ->when(
                (bool) ($data['featured_only'] ?? false),
                fn ($query) => $query->where('is_featured', true)
            )
            ->ordered();

        return $query->limit($limit)->get();
    }
}
