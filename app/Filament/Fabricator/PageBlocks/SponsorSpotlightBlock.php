<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\SharedObjects\BrandPartner;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class SponsorSpotlightBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('sponsor-spotlight')
            ->label('Sponsor Spotlight')
            ->schema([
                TextInput::make('title')
                    ->label('Override Title')
                    ->helperText('Optional. Falls back to the partner headline or name.'),

                Select::make('partner_id')
                    ->label('Partner')
                    ->options(fn (): array => BrandPartner::query()->ordered()->pluck('name', 'id')->all())
                    ->searchable()
                    ->preload()
                    ->required(),

                Toggle::make('use_banner_image')
                    ->default(true),

                Toggle::make('show_excerpt')
                    ->default(true),

                Toggle::make('show_body')
                    ->default(true),

                Toggle::make('show_cta')
                    ->default(true),

                Toggle::make('show_disclosure')
                    ->default(true),
            ]);
    }

    public static function mutateData(array $data): array
    {
        $partner = null;

        if (! empty($data['partner_id'])) {
            $partner = BrandPartner::query()
                ->with([
                    'links' => fn ($query) => $query->active()->ordered(),
                    'media',
                ])
                ->displayable()
                ->find($data['partner_id']);
        }

        return array_merge($data, [
            'partner' => $partner,
        ]);
    }
}
