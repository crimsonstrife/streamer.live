<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\Post;
use Filament\Forms\Components\Builder\Block;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class BlogFeaturedPosts extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('blog-featured-posts')->label('Blog: Featured Posts')
            ->schema([
                //
            ]);
    }

    public static function mutateData(array $data): array
    {
        return [
            'featuredPosts' => Post::published()
                ->whereHas('tags', fn ($q) => $q->where('name', 'featured'))
                ->latest()
                ->take(3)
                ->get(),
        ];
    }
}
