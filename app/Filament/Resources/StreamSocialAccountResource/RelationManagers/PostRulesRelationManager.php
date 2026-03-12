<?php

namespace App\Filament\Resources\StreamSocialAccountResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class PostRulesRelationManager extends RelationManager
{
    protected static string $relationship = 'postRules'; // you’ll add this relationship on the model

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Toggle::make('enabled')->default(true),
            Forms\Components\Select::make('event')->options([
                'live' => 'Went Live',
            ])->required()->default('live'),
            Forms\Components\TextInput::make('streamer_username')
                ->helperText('Optional. If blank, applies to any streamer.')
                ->maxLength(255),
            Forms\Components\TextInput::make('category_pattern')
                ->helperText('Optional regex. Example: "/^(Just Chatting|Elden Ring)$/i"')
                ->maxLength(255)
                ->rule(fn () => function (string $attribute, $value, $fail) {
                    if ($value && @preg_match($value, '') === false) {
                        $fail('Invalid regex pattern.');
                    }
                }),
            Forms\Components\Textarea::make('message_template')
                ->required()
                ->rows(4)
                ->helperText('Tokens: {streamer} {category} {title} {url} {stream_id} {started_at}'),
            Forms\Components\TextInput::make('sort_order')
                ->numeric()
                ->default(0),
            Forms\Components\KeyValue::make('options')->nullable(),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->columns([
                Tables\Columns\IconColumn::make('enabled')->boolean(),
                Tables\Columns\TextColumn::make('event'),
                Tables\Columns\TextColumn::make('streamer_username')->placeholder('Any'),
                Tables\Columns\TextColumn::make('sort_order')->sortable(),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}
