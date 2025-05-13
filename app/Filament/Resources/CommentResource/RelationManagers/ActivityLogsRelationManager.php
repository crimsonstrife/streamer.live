<?php

namespace App\Filament\Resources\CommentResource\RelationManagers;

use Exception;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Spatie\Activitylog\Models\Activity;

class ActivityLogsRelationManager extends RelationManager
{
    protected static string $relationship = 'activities';

    protected static ?string $recordTitleAttribute = 'description';

    /**
     * @throws Exception
     */
    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('When')
                    ->dateTime()
                    ->since(),
                Tables\Columns\TextColumn::make('description')
                    ->label('Action'),
                Tables\Columns\TextColumn::make('causer.name')
                    ->label('By'),
                Tables\Columns\TextColumn::make('properties')
                    ->label('Details')
                    ->formatStateUsing(fn ($state) => json_encode($state, JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT))
                    ->wrap(),
            ])
            ->filters([
                SelectFilter::make('log_name')
                    ->label('Log Name')
                    // pull distinct log names from the activity table
                    ->options(fn () => Activity::distinct()
                        ->pluck('log_name', 'log_name')
                        ->toArray()),
            ]);
    }
}
