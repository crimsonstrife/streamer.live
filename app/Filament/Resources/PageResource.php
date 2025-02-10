<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Filament\Resources\PageResource\RelationManagers;
use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('slug')
                    ->unique(Page::class, 'slug', ignoreRecord: true)
                    ->required(),

                Forms\Components\Textarea::make('excerpt')
                    ->maxLength(500),

                Forms\Components\RichEditor::make('content'),

                Forms\Components\Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ])
                    ->required(),

                Forms\Components\Toggle::make('is_protected')
                    ->label('Password Protect Page'),

                Forms\Components\TextInput::make('password')
                    ->password()
                    ->visible(fn ($get) => $get('is_protected')),

                Forms\Components\DateTimePicker::make('published_at')
                    ->label('Publication Date'),

                Forms\Components\Select::make('tags')
                    ->multiple()
                    ->relationship('tags', 'name'),

                Forms\Components\Select::make('created_by')
                    ->relationship('author', 'username')
                    ->disabled()
                    ->visibleOn('edit'),

                Forms\Components\Select::make('updated_by')
                    ->relationship('editor', 'username')
                    ->disabled()
                    ->visibleOn('edit'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('status')->sortable(),
                Tables\Columns\IconColumn::make('is_protected')->boolean(),
                Tables\Columns\TextColumn::make('published_at')->dateTime(),
                Tables\Columns\TextColumn::make('created_by.username')->label('Author')->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('Edit Blocks')
                    ->url(fn (Page $record) => route('page.builder', ['page' => $record->id]))
                    ->icon('heroicon-o-pencil')
                    ->openUrlInNewTab(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            'tags' => RelationManagers\TagsRelationManager::class,
            'author' => RelationManagers\AuthorRelationManager::class,
            'editor' => RelationManagers\EditorRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
