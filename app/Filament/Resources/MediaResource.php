<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MediaResource\Pages;
use ElmudoDev\FilamentCustomAttributeFileUpload\Forms\Components\CustomAttributeSpatieMediaLibraryFileUpload;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;

class MediaResource extends Resource
{
    protected static ?string $navigationGroup = 'CMS';
    protected static ?string $navigationIcon = 'fas-photo-film';
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMedia::route('/')
        ];
    }


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('model_name')->label('Model Name'),
                TextInput::make('model_size_worn')->label('Size Worn'),
                TextInput::make('model_height_cm')->label('Height (cm)'),
                TextInput::make('model_description')->label('Description'),
                TextInput::make('image_title')->label('Image Title'),
                TextInput::make('image_alt_text')->label('Alt Text'),
                CustomAttributeSpatieMediaLibraryFileUpload::make('replace')
                    ->collection('images')
                    ->label('Replace File'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('id')
                    ->label('Preview')
                    ->getStateUsing(fn ($record) => $record->getFullUrl())
                    ->square(),
                TextColumn::make('model_type')->searchable()->label('Model'),
                TextColumn::make('model_id')->label('Model ID'),
                TextColumn::make('collection_name')->label('Collection'),
                TextColumn::make('custom_properties->model_name')
                    ->label('Model Name'),
                TextColumn::make('file_name')->label('Filename'),
                TextColumn::make('created_at')->dateTime(),
            ]);
    }
}
