<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use App\Models\Order;
use App\Models\AuthObjects\User;
use Filament\Forms\Components\FileUpload;
use Filament\Pages\Actions\Action;
use Filament\Resources\Pages\Page;
use Illuminate\Support\Facades\Storage;
use League\Csv\Reader;

class ImportOrder extends Page
{
    protected static string $resource = OrderResource::class;

    protected static string $view = 'filament.resources.order-resource.pages.order-import';

    protected function getHeaderActions(): array
    {
        return [
            Action::make('Upload CSV')
                ->form([
                    FileUpload::make('csv')
                        ->acceptedFileTypes(['text/csv', 'application/vnd.ms-excel'])
                        ->disk('local') // Explicitly use the local disk
                        ->directory('temp') // Optional: Save to a 'temp' directory inside storage/app
                        ->preserveFilenames()
                        ->required(),
                ])
                ->action(function (array $data): void {
                    $path = $data['csv'];
                    $csv = Reader::createFromPath(storage_path("app/private/{$path}"), 'r');
                    $csv->setHeaderOffset(0);
                    foreach ($csv->getRecords() as $record) {
                        Order::updateOrCreate(
                            ['provider_id' => $record['ID']],
                            [
                                'friendly_id' => $record['FRIENDLY ID'],
                                'status' => $record['STATUS'] ?? 'PENDING',
                                'email' => $record['SUPPORTER EMAIL'],
                                'username' => $record['USERNAME'] ?? null,
                                'email_marketing_opt_in' => filter_var($record['EMAIL MARKETING OPT-IN'], FILTER_VALIDATE_BOOLEAN),
                                'message' => $record['MESSAGE'] ?? null,
                                'billing_address' => [
                                    'first_name' => $record['BILLING FIRST NAME'],
                                    'last_name' => $record['BILLING LAST NAME'],
                                    'address' => $record['BILLING ADDRESS'],
                                    'city' => $record['BILLING CITY'],
                                    'state' => $record['BILLING STATE'],
                                    'zip' => $record['BILLING ZIP'],
                                    'country' => $record['BILLING COUNTRY'],
                                ],
                                'shipping_address' => [
                                    'name' => $record['SHIPPING NAME'],
                                    'address' => $record['SHIPPING ADDRESS'],
                                    'city' => $record['SHIPPING CITY'],
                                    'state' => $record['SHIPPING STATE'],
                                    'zip' => $record['SHIPPING ZIP'],
                                    'country' => $record['SHIPPING COUNTRY'],
                                ],
                                'subtotal' => (float) str_replace(['$', ','], '', $record['MERCHANDISE']),
                                'shipping' => (float) str_replace(['$', ','], '', $record['SHIPPING']),
                                'tax' => (float) str_replace(['$', ','], '', $record['TAXES']),
                                'donation' => (float) str_replace(['$', ','], '', $record['DONATION']),
                                'discount' => (float) str_replace(['$', ','], '', $record['DISCOUNT']),
                                'refunded' => (float) str_replace(['$', ','], '', $record['REFUNDED']),
                                'total' => 0, // You can calculate it or leave 0
                                'currency' => 'USD',
                                'user_id' => User::where('email', $record['SUPPORTER EMAIL'])->value('id'),
                                'created_at' => $record['DATE (UTC)'],
                                'updated_at' => $record['DATE (UTC)'],
                            ]
                        );
                    }

                    session()->flash('success', 'CSV Imported successfully!');
                    Storage::disk('local')->delete($path);
                }),
        ];
    }
}
