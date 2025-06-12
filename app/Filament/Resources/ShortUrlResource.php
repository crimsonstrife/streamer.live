<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ShortUrlResource\Pages;
use A21ns1g4ts\FilamentShortUrl\Filament\Resources\ShortUrlResource as BaseShortUrlResource;
use A21ns1g4ts\FilamentShortUrl\Filament\Resources\ShortUrlResource\Widgets\ShortUrlStats;
use Filament\Actions\Action;
use Filament\Pages\Page;

class ShortUrlResource extends BaseShortUrlResource
{
    protected static ?string $navigationIcon = 'fas-link';
    protected static ?string $navigationGroup = 'CMS';
    protected static ?string $slug = 'cms/short-url';
    protected static ?string $navigationLabel = 'Short URLs';
    protected static ?string $title = "Short URLs";
    protected static ?int $navigationSort = 5;

    public static function getWidgets(): array
    {
        return [
            ShortUrlStats::class,
        ];
    }

    public static function getRecordSubNavigation(Page $page): array
    {
        return $page->generateNavigationItems([
            Pages\ViewShortUrl::class,
            Pages\EditShortUrl::class,
            Pages\ListShortUrlVisits::class,
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListShortUrls::route('/'),
            'create' => Pages\CreateShortUrl::route('/create'),
            'view' => Pages\ViewShortUrl::route('/{record}'),
            'edit' => Pages\EditShortUrl::route('/{record}/edit'),
            'visits' => Pages\ListShortUrlVisits::route('/{record}/visits'),
        ];
    }
}
