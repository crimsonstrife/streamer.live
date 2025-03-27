<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ImagesRelationManager extends RelationManager
{
    protected static string $relationship = 'images';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\FileUpload::make('local_path')
                ->label('Image')
                ->image()
                ->directory(fn ($livewire) => 'products/'.$livewire->ownerRecord->provider_id)
                ->disk('public')
                ->required(),
            Forms\Components\TextInput::make('alt_text')
                ->label('Alt Text')
                ->required()
                ->maxLength(255),
            Forms\Components\Fieldset::make('Model Info')
                ->schema([
                    Forms\Components\TextInput::make('model_name')->label('Model Name'),
                    Forms\Components\TextInput::make('model_height_cm')->label('Model Height (cm)')->numeric(),
                    Forms\Components\TextInput::make('model_size_worn')->label('Size Worn'),
                    Forms\Components\Textarea::make('model_description')->label('Model Description')->rows(3),
                ])
                ->columns(2),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\ImageColumn::make('local_path')
                    ->label('Image')
                    ->disk('public')
                    ->url(fn ($record) => $record->image_url)->height(50),
                Tables\Columns\TextColumn::make('alt_text')->wrap(),
                Tables\Columns\TextColumn::make('model_name'),
                Tables\Columns\TextColumn::make('model_height_cm'),
                Tables\Columns\TextColumn::make('model_size_worn'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
