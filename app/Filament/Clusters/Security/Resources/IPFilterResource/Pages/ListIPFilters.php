<?php

namespace App\Filament\Clusters\Security\Resources\IPFilterResource\Pages;

use App\Filament\Clusters\Security\Resources\IPFilterResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions;
use Filament\Actions\Action;
use Illuminate\Support\Facades\Artisan;

class ListIPFilters extends ListRecords
{
    protected static string $resource = IPFilterResource::class;

    protected static ?string $title = "IP Address Filters";

    /**
     * Add a header action button to trigger the blacklist update.
     */
    protected function getHeaderActions(): array
    {
        return [
            // Keep the default Create action
            Actions\CreateAction::make(),

            // Our custom “Update Blacklist” button
            Action::make('updateBlacklist')
                ->label('Update Blacklist')
                ->icon('fas-arrows-rotate')
                ->color('primary')
                ->requiresConfirmation()
                ->action('updateBlacklist')
                ->successNotificationTitle('AbuseIPDB blacklist has been updated.')
                ->dispatch('refreshTable'),
        ];
    }

    /**
     * This method is invoked when the button is clicked.
     */
    public function updateBlacklist(): int
    {
        // Run the artisan command
        return Artisan::call('update:blacklist');
    }
}
