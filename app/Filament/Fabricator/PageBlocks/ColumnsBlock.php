<?php
namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Builder;

class ColumnsBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('columns')
            ->label('2 Columns')
            ->schema([
                Toggle::make('full_width')
                    ->label('Full width')
                    ->default(false),

                Builder::make('left')
                    ->label('Left column')
                    ->blocks(self::availableNestedBlocks()),

                Builder::make('right')
                    ->label('Right column')
                    ->blocks(self::availableNestedBlocks()),
            ]);
    }

    protected static function availableNestedBlocks(): array
    {
        return [
            BlogAuthorBio::getBlockSchema(),
            BlogComments::getBlockSchema(),
            BlogFeaturedPosts::getBlockSchema(),
            BlogPost::getBlockSchema(),
            BlogPostList::getBlockSchema(),
            HTMLBlock::getBlockSchema(),
            MarkdownBlock::getBlockSchema(),
            StoreCategoryList::getBlockSchema(),
            StoreFeaturedProducts::getBlockSchema(),
            StoreNewReleases::getBlockSchema(),
            StoreProductDetail::getBlockSchema(),
            StoreRelatedProducts::getBlockSchema(),
            TwitchEmbed::getBlockSchema(),
        ];
    }

    public static function mutateData(array $data): array
    {
        return $data;
    }
}

