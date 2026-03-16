<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\SharedObjects\BrandPartner;
use App\Models\SharedObjects\BrandPartnerLink;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class AffiliateLinksBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('affiliate-links')
            ->label('Affiliate Links')
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

                Select::make('link_ids')
                    ->label('Links')
                    ->options(function (): array {
                        return BrandPartnerLink::query()
                            ->with('brandPartner')
                            ->ordered()
                            ->get()
                            ->mapWithKeys(function (BrandPartnerLink $link) {
                                $partnerName = $link->brandPartner?->name;
                                $label = $partnerName ? "{$partnerName} — {$link->label}" : $link->label;

                                return [$link->id => $label];
                            })
                            ->all();
                    })
                    ->multiple()
                    ->searchable()
                    ->preload()
                    ->visible(fn ($get): bool => $get('source') === 'manual'),

                Select::make('types')
                    ->label('Included Partner Types')
                    ->options([
                        'partner' => 'Partner',
                        'affiliate' => 'Affiliate',
                        'sponsor' => 'Sponsor',
                    ])
                    ->multiple()
                    ->searchable()
                    ->preload()
                    ->visible(fn ($get): bool => $get('source') === 'automatic'),

                Toggle::make('primary_only')
                    ->default(true),

                TextInput::make('limit')
                    ->numeric()
                    ->default(6)
                    ->minValue(1)
                    ->visible(fn ($get): bool => $get('source') === 'automatic'),

                Select::make('columns')
                    ->options([
                        1 => '1 column',
                        2 => '2 columns',
                        3 => '3 columns',
                    ])
                    ->default(3)
                    ->native(false),

                Toggle::make('show_partner_name')
                    ->default(true),

                Toggle::make('show_coupon')
                    ->default(true),

                Toggle::make('show_disclosure')
                    ->default(true),
            ]);
    }

    public static function mutateData(array $data): array
    {
        $links = static::resolveLinks($data);

        return array_merge($data, [
            'links' => $links,
        ]);
    }

    protected static function resolveLinks(array $data)
    {
        $source = $data['source'] ?? 'automatic';
        $primaryOnly = (bool) ($data['primary_only'] ?? true);

        $query = BrandPartnerLink::query()
            ->with(['brandPartner', 'brandPartner.media'])
            ->active()
            ->ordered();

        if ($source === 'manual') {
            $ids = array_map('intval', $data['link_ids'] ?? []);

            if ($ids === []) {
                return collect();
            }

            $records = $query->whereIn('id', $ids)->get();
            $order = collect($ids)->flip();

            return $records
                ->sortBy(fn (BrandPartnerLink $link) => $order[$link->id] ?? PHP_INT_MAX)
                ->values();
        }

        $types = array_filter($data['types'] ?? []);
        $limit = max(1, (int) ($data['limit'] ?? 6));

        if ($primaryOnly) {
            $query->primary();
        }

        $query->whereHas('brandPartner', function ($partnerQuery) use ($types) {
            $partnerQuery
                ->displayable()
                ->ofTypes($types);
        });

        return $query->limit($limit)->get();
    }
}
