<?php

namespace App\Filament\Resources\GoalResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\View;
use Filament\Notifications\Notification;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class GoalBannerRelationManager extends RelationManager
{
    protected static string $relationship = 'bannerMedia';

    protected static ?string $recordTitleAttribute = 'file_name';

    protected static ?string $label = 'Banner Image';

    protected static ?string $pluralLabel = 'Banner Image';

    public function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                View::make('preview')
                    ->view('filament.partials.media-preview')
                    ->columnSpanFull(),

                TextInput::make('custom_properties.image_alt_text')
                    ->label('Alt Text')
                    ->required(),

                TextInput::make('custom_properties.image_title')
                    ->label('Title'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('id')
                    ->label('Preview')
                    ->getStateUsing(fn ($record) => $record->getMediaUrl()),

                Tables\Columns\TextColumn::make('file_name')
                    ->label('Filename'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Uploaded')
                    ->dateTime(),
            ])
            ->headerActions([
                Action::make('uploadBanner')
                    ->hidden(fn () => $this->ownerRecord->getMedia('banner')->isNotEmpty())
                    ->label('Upload Banner')
                    ->form([
                        FileUpload::make('file')
                            ->label('Banner Image')
                            ->image()
                            ->required()
                            ->disk(config('filesystems.upload_disk', 'public'))
                            ->directory('tmp'),
                        TextInput::make('image_alt_text')
                            ->label('Alt Text')
                            ->required(),
                        TextInput::make('image_title')
                            ->label('Title'),
                    ])
                    ->action(function (array $data): void {
                        $this->ownerRecord->clearMediaCollection('banner');

                        $disk = config('filesystems.upload_disk', 'public');
                        $path = Storage::disk($disk)->path($data['file']);

                        $media = $this->ownerRecord
                            ->addMedia($path)
                            ->usingFileName(basename($path))
                            ->preservingOriginal()
                            ->withResponsiveImages()
                            ->toMediaCollection('banner');

                        $media
                            ->setCustomProperty('image_alt_text', $data['image_alt_text'])
                            ->setCustomProperty('image_title', $data['image_title'] ?? null)
                            ->save();

                        Storage::disk($disk)->delete($data['file']);

                        Notification::make()
                            ->title('Banner uploaded')
                            ->success()
                            ->send();
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Edit Banner'),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
}
