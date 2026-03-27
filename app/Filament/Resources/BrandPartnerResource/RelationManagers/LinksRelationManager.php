<?php

namespace App\Filament\Resources\BrandPartnerResource\RelationManagers;

use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class LinksRelationManager extends RelationManager
{
    protected static string $relationship = 'links';

    protected static ?string $recordTitleAttribute = 'label';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('label')
                    ->required()
                    ->maxLength(255),

                TextInput::make('url')
                    ->required()
                    ->url()
                    ->maxLength(2048)
                    ->columnSpanFull(),

                Select::make('link_type')
                    ->required()
                    ->options([
                        'primary' => 'Primary',
                        'affiliate' => 'Affiliate',
                        'coupon' => 'Coupon',
                        'social' => 'Social',
                        'landing' => 'Landing',
                    ])
                    ->default('primary')
                    ->native(false),

                TextInput::make('button_text')
                    ->maxLength(255),

                TextInput::make('coupon_code')
                    ->maxLength(255),

                Toggle::make('is_primary')
                    ->default(false),

                Toggle::make('is_active')
                    ->default(true),

                Toggle::make('open_in_new_tab')
                    ->default(true),

                Toggle::make('nofollow')
                    ->default(true),

                Toggle::make('sponsored')
                    ->default(false),

                TextInput::make('sort_order')
                    ->numeric()
                    ->default(0)
                    ->minValue(0),

                KeyValue::make('meta')
                    ->columnSpanFull(),
            ])
            ->columns(3);
    }

    public function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('label')
                    ->searchable(),

                TextColumn::make('link_type')
                    ->badge(),

                TextColumn::make('coupon_code')
                    ->toggleable(),

                IconColumn::make('is_primary')
                    ->boolean(),

                IconColumn::make('is_active')
                    ->boolean(),

                IconColumn::make('nofollow')
                    ->boolean()
                    ->label('nofollow'),

                IconColumn::make('sponsored')
                    ->boolean(),

                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),
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
