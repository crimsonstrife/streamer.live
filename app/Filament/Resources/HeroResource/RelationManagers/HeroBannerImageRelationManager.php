<?php

namespace App\Filament\Resources\HeroResource\RelationManagers;

use App\Services\CustomMediaPathGenerator;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\View;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Table;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class HeroBannerImageRelationManager extends RelationManager
{
    protected static string $relationship = 'heroMedia';
    protected static ?string $recordTitleAttribute = 'file_name';
    protected static ?string $label = 'Banner Image';
    protected static ?string $pluralLabel = 'Banner Images';

    public function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                View::make('preview')
                    ->view('filament.partials.media-preview')
                    ->columnSpanFull(),

                FileUpload::make('replacement')
                    ->label('Replace Banner Image')
                    ->image()
                    ->disk('public')
                    ->directory('tmp')
                    ->dehydrated(false),

                TextInput::make('custom_properties.image_title')
                    ->label('Title'),

                TextInput::make('custom_properties.image_order')
                    ->label('Order'),

                TextInput::make('custom_properties.image_description')
                    ->label('Description'),

                TextInput::make('custom_properties.image_alt_text')
                    ->label('Alt Text')
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('custom_properties.image_order')
                    ->label('Order'),

                Tables\Columns\ImageColumn::make('id')
                    ->label('Preview')
                    ->getStateUsing(fn ($record) => $record->getMediaUrl()),

                Tables\Columns\TextColumn::make('file_name')
                    ->label('Filename'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Uploaded')
                    ->searchable()
                    ->sortable()
                    ->dateTime(),
            ])
            ->headerActions([
                Action::make('uploadPhoto')
                    ->label('Upload Banner Image')
                    ->form([
                        FileUpload::make('file')
                            ->label('Image')
                            ->image()
                            ->required()
                            ->disk('public')
                            ->directory('tmp'),

                        TextInput::make('image_title')
                            ->label('Title'),

                        TextInput::make('image_order')
                            ->label('Order'),

                        TextInput::make('image_description')
                            ->label('Description'),

                        TextInput::make('image_alt_text')
                            ->label('Alt Text')
                            ->required(),
                    ])
                    ->action(function (array $data): void {
                        // store the temp file path
                        $path = Storage::disk('public')->path($data['file']);

                        // let Spatie handle all the DB columns
                        $media = $this->ownerRecord
                            ->addMedia($path)
                            ->usingFileName(basename($path))
                            ->preservingOriginal()
                            ->withResponsiveImages()
                            ->toMediaCollection('images');

                        // now stamp on your JSON metadata
                        $media
                            ->setCustomProperty('image_title', $data['image_title'])
                            ->setCustomProperty('image_order', $data['image_order'])
                            ->setCustomProperty('image_description', $data['image_description'])
                            ->setCustomProperty('image_alt_text',    $data['image_alt_text'])
                            ->save();

                        Notification::make()
                            ->title('📸 Image uploaded')
                            ->success()
                            ->send();
                    }),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->label('Edit Image Banner')
                    // use existing form() schema here automatically
                    ->after(function ($livewire, $record, array $data): void {
                        // Spatie has already updated `custom_properties` via the form()
                        // If the user uploaded a replacement image:
                        if (! empty($data['replacement'])) {
                            // disk & generator
                            $disk = 'public';
                            $storage = Storage::disk($disk);
                            $generator = app(CustomMediaPathGenerator::class);

                            // temp file path on disk:
                            $tempPath = $storage->path($data['replacement']);

                            // new filename:
                            $newFilename = basename($tempPath);

                            // destination directory (your path generator):
                            $destDir = $generator->getPath($record);

                            // ensure directory exists:
                            $storage->makeDirectory($destDir);

                            // copy the new file into place:
                            $storage->putFileAs($destDir, new File($tempPath), $newFilename);

                            // delete the temp upload:
                            $storage->deleteDirectory(
                                dirname($data['replacement'])
                            );

                            // delete the old file:
                            $oldPath = $destDir . $record->file_name;
                            $storage->delete($oldPath);

                            // update the DB columns on this record:
                            $fullDestPath = $destDir . $newFilename;
                            $record->forceFill([
                                'file_name' => $newFilename,
                                'disk'      => $disk,
                                'mime_type' => $storage->mimeType($fullDestPath),
                                'size'      => $storage->size($fullDestPath),
                            ])->save();
                        }
                    }),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
}
