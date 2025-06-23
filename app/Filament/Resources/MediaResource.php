<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MediaResource\Pages;
use App\Filament\Resources\MediaResource\RelationManagers;
use App\Models\Media;
use App\Services\CustomMediaPathGenerator;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\View;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MediaResource extends Resource
{
    protected static ?string $model = Media::class;
    protected static ?string $navigationGroup = 'CMS';
    protected static ?string $navigationLabel = 'Media Library';
    protected static ?string $navigationIcon = 'fas-photo-film';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                View::make('preview')
                    ->view('filament.partials.media-preview')
                    ->columnSpanFull(),

                FileUpload::make('file')
                ->label('File')
                    ->required(fn ($livewire, $record) => is_null($record))
                    ->image()
                    ->disk('public')
                    ->directory('tmp')
                    ->dehydrated(false),

                TextInput::make('collection_name')
                    ->label('Collection')
                    ->disabled(),

                TextInput::make('model_type')
                    ->label('Attached To')
                    ->disabled()
                    ->helperText(fn (?Media $record) => $record
                        ? "ID: {$record->model_id}"
                        : 'Not attached yet'
                    ),

                KeyValue::make('custom_properties')
                    ->label('Metadata')
                    ->keyLabel('Key')
                    ->valueLabel('Value'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('preview')
                    ->label('Preview')
                    ->getStateUsing(fn ($record) => $record->getMediaUrl()),

                TextColumn::make('collection_name')->sortable(),
                TextColumn::make('model_type')->sortable(),
                TextColumn::make('model_id')->sortable(),
                TextColumn::make('file_name')->searchable(),

                TextColumn::make('custom_properties')
                    ->label('Metadata')
                    ->formatStateUsing(fn($state) => json_encode($state)),

                TextColumn::make('created_at')
                    ->label('Uploaded')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\Filter::make('collection')
                    ->form([
                        TextInput::make('collection'),
                    ])
                    ->query(fn($query, array $data) => $query->when($data['collection'], fn($q) =>
                    $q->where('collection_name', $data['collection'])
                    )),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => MediaResource\Pages\ListMedia::route('/'),
            'create' => MediaResource\Pages\CreateMedia::route('/create'),
            'edit' => MediaResource\Pages\EditMedia::route('/{record}/edit'),
        ];
    }
}
