<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\Post;
use Filament\Forms\Components\Builder\Block;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class BlogPostList extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('blog-post-list')->label('Blog: Post List')
            ->schema([
                //
            ]);
    }

    public static function mutateData(array $data): array
    {
        return [
            'posts' => Post::published()->withCount('comments')->latest()->paginate(10),
        ];
    }
}
