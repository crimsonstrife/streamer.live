<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class BlogComments extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('blog-comments')->label('Blog: Comments')
            ->schema([
                //
            ]);
    }

    public static function mutateData(array $data): array
    {
        $post = data_get($data, 'post');

        $comments = $post ? $post->comments->where('approved', true) : collect();

        return [
            'comments' => $comments,
            'comments_locked' => $post->comments_locked ?? false,
        ];
    }
}
