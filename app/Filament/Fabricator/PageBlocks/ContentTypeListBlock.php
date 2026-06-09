<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Models\ContentObjects\ContentEntry;
use App\Models\ContentObjects\ContentType;
use App\Utilities\SchemaCache;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class ContentTypeListBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        $options = SchemaCache::hasTable('content_types')
            ? ContentType::active()->pluck('name', 'slug')->toArray()
            : [];

        return Block::make('content-type-list')
            ->label('Content: Entry List')
            ->schema([
                Select::make('content_type')
                    ->label('Content Type')
                    ->options($options)
                    ->required(),
                TextInput::make('limit')
                    ->label('Max Entries')
                    ->numeric()
                    ->default(6)
                    ->minValue(1)
                    ->maxValue(50),
                Select::make('sort')
                    ->label('Sort By')
                    ->options([
                        'newest' => 'Newest First',
                        'oldest' => 'Oldest First',
                        'title' => 'Title A-Z',
                        'sort_order' => 'Manual Order',
                    ])
                    ->default('newest'),
            ]);
    }

    public static function mutateData(array $data): array
    {
        $slug = $data['content_type'] ?? null;
        $limit = (int) ($data['limit'] ?? 6);
        $sort = $data['sort'] ?? 'newest';

        if (! $slug) {
            return ['contentType' => null, 'entries' => collect(), 'fields' => collect()];
        }

        $contentType = ContentType::where('slug', $slug)->where('is_active', true)->first();

        if (! $contentType) {
            return ['contentType' => null, 'entries' => collect(), 'fields' => collect()];
        }

        $query = ContentEntry::where('content_type_id', $contentType->id)
            ->withPublishedContext();

        $query = match ($sort) {
            'oldest' => $query->orderBy('created_at'),
            'title' => $query->orderBy('title'),
            'sort_order' => $query->orderBy('sort_order'),
            default => $query->orderByDesc('created_at'),
        };

        return [
            'contentType' => $contentType,
            'entries' => $query->limit($limit)->get(),
            'fields' => $contentType->getActiveFields(),
        ];
    }
}
