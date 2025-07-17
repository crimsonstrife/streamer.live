<?php

namespace App\Filament\Resources\TicketResource\RelationManagers;

use App\Models\AuthObjects\User;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class MessagesRelationManager extends RelationManager
{
    protected static string $relationship = 'messages';

    protected static ?string $recordTitleAttribute = 'content';

    public function form(Form $form): Form
    {
        return $form->schema([
            Textarea::make('content')
                ->label('Message')
                ->required()
                ->rows(3),

            Toggle::make('is_public')
                ->label('Public')
                ->default(true),
        ]);
    }

    public function mutateFormDataBeforeCreate(array $data): array
    {
        return array_merge($data, [
            'commented_by_id' => auth()->id(),
            'commented_by_type' => User::class,
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('commentedBy.username')
                    ->label('Author')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('content')
                    ->label('Message')
                    ->wrap()
                    ->limit(50),
                TextColumn::make('is_public')
                    ->badge()
                    ->label('Public'),
                TextColumn::make('created_at')
                    ->label('Posted At')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_public')
                    ->label('Visibility'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
}
