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

class GoalGalleryRelationManager extends RelationManager
{
    protected static string $relationship = 'galleryMedia';

    protected static ?string $recordTitleAttribute = 'file_name';

    protected static ?string $label = 'Gallery Photo';

    protected static ?string $pluralLabel = 'Gallery Photos';

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

                TextInput::make('custom_properties.caption')
                    ->label('Caption'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('id')
                    ->label('Preview')
                    ->getStateUsing(fn ($record) => $record->getMediaUrl()),

                Tables\Columns\TextColumn::make('custom_properties.caption')
                    ->label('Caption'),

                Tables\Columns\TextColumn::make('file_name')
                    ->label('Filename'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Uploaded')
                    ->dateTime(),
            ])
            ->headerActions([
                Action::make('uploadPhoto')
                    ->label('Upload Photo')
                    ->form([
                        FileUpload::make('file')
                            ->label('Photo')
                            ->image()
                            ->required()
                            ->disk('public')
                            ->directory('tmp'),
                        TextInput::make('image_alt_text')
                            ->label('Alt Text')
                            ->required(),
                        TextInput::make('caption')
                            ->label('Caption'),
                    ])
                    ->action(function (array $data): void {
                        $path = Storage::disk('public')->path($data['file']);

                        $media = $this->ownerRecord
                            ->addMedia($path)
                            ->usingFileName(basename($path))
                            ->preservingOriginal()
                            ->withResponsiveImages()
                            ->toMediaCollection('gallery');

                        $media
                            ->setCustomProperty('image_alt_text', $data['image_alt_text'])
                            ->setCustomProperty('caption', $data['caption'] ?? null)
                            ->save();

                        Notification::make()
                            ->title('Photo uploaded')
                            ->success()
                            ->send();
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('Edit Photo'),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
}
