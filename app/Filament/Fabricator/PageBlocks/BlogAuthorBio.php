<?php

namespace App\Filament\Fabricator\PageBlocks;

use Filament\Forms\Components\Builder\Block;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class BlogAuthorBio extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('blog-author-bio')->label('Blog: Author Bio')
            ->schema([
                //
            ]);
    }

    public static function mutateData(array $data): array
    {
        $post = data_get($data, 'post');

        return [
            'author' => $post?->author ?? collect(),
        ];
    }
}
