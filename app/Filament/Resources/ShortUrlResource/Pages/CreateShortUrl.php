<?php

namespace App\Filament\Resources\ShortUrlResource\Pages;

use App\Filament\Resources\ShortUrlResource;
use AshAllenDesign\ShortURL\Classes\Builder;
use AshAllenDesign\ShortURL\Models\ShortURL;
use Filament\Actions\Action;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;

class CreateShortUrl extends CreateRecord
{
    protected static string $resource = ShortUrlResource::class;

    protected static ?string $title = "New Short URL";

    protected function handleRecordCreation(array $data): Model
    {
        $shortUrl = app(Builder::class)->destinationUrl($data['destination_url'])
            ->when($data['activated_at'], fn (Builder $builder) => $builder->activateAt(Carbon::parse($data['activated_at'])))
            ->when($data['deactivated_at'], fn (Builder $builder) => $builder->deactivateAt(Carbon::parse($data['deactivated_at'])))
            ->beforeCreate(function (ShortURL $model): void {
                if (Schema::hasColumn('short_urls', 'company_id')) {
                    $model->company_id = auth()->user()->current_company_id;
                }
            })
            ->make();

        return $shortUrl;
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('index')
                ->label('List')
                ->url(ListShortUrls::getUrl()),
        ];
    }
}
