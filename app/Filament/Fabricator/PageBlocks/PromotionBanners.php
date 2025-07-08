<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\StoreObjects\Promotion;
use App\Settings\FourthwallSettings;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Placeholder;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class PromotionBanners extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        $settings = app(FourthwallSettings::class);

        $block = Block::make('promotion-banners')
            ->label('Promotion Banners');

        if (! $settings->enable_integration) {
            return $block->schema([
                Placeholder::make('warning')
                    ->label('')
                    ->content('Store integration is disabled. Enable it in Settings to display promotions.'),
            ]);
        }

        return $block->schema([]);
    }

    public static function mutateData(array $data): array
    {
        $orderPromotions = Promotion::where('status', 'Live')
            ->where('applies_to', 'ENTIRE_ORDER')
            ->get();

        return array_merge($data, [
            'orderPromotions' => $orderPromotions,
        ]);
    }
}
