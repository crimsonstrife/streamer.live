<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AuthorResource\Pages;
use App\Models\BlogObjects\Author;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use App\Traits\HasContentEditor;

class AuthorResource extends Resource
{
    use HasContentEditor;

    protected static ?string $model = Author::class;

    protected static ?string $slug = 'blog/authors';

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $navigationGroup = 'Blog';

    protected static ?string $navigationIcon = 'fas-user-pen';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label(__('filament-blog::filament-blog.name'))
                            ->required(),
                        Forms\Components\TextInput::make('email')
                            ->label(__('filament-blog::filament-blog.email'))
                            ->required()
                            ->email()
                            ->unique(Author::class, 'email', fn ($record) => $record),
                        Forms\Components\FileUpload::make('photo')
                            ->label(__('filament-blog::filament-blog.photo'))
                            ->image()
                            ->disk(config('filament-blog.avatar.disk', 'public'))
                            ->visibility(config('filament-blog.avatar.visibility', 'public'))
                            ->maxSize(config('filament-blog.avatar.maxSize', 5120))
                            ->directory(config('filament-blog.avatar.directory', 'blog'))
                            ->columnSpan([
                                'sm' => 2,
                            ]),
                        Forms\Components\Select::make('user_id')
                            ->label('Linked User')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->name) // Uses accessor safely
                            ->disabled(fn (?Author $record) => $record?->user_id && ! auth()->user()->can('updateUserLink'))
                            ->options(function (?Author $record) {
                                $query = \App\Models\AuthObjects\User::query();

                                // Exclude users already linked to other authors
                                if ($record) {
                                    $query->where(function ($q) use ($record) {
                                        $q->whereDoesntHave('blogAuthor')
                                            ->orWhereHas('blogAuthor', fn ($q2) => $q2->where('id', $record->id));
                                    });
                                } else {
                                    $query->whereDoesntHave('blogAuthor');
                                }

                                return $query->get()->mapWithKeys(fn ($user) => [
                                    $user->id => $user->name,
                                ])->toArray();
                            }),
                        self::getContentEditor('bio'),
                        Forms\Components\TextInput::make('github_handle')
                            ->label(__('filament-blog::filament-blog.github')),
                        Forms\Components\TextInput::make('twitter_handle')
                            ->label(__('filament-blog::filament-blog.twitter')),
                    ])
                    ->columns([
                        'sm' => 2,
                    ])
                    ->columnSpan(2),
                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\Placeholder::make('created_at')
                            ->label(__('filament-blog::filament-blog.created_at'))
                            ->content(fn (
                                ?Author $record
                            ): string => $record ? $record->created_at->diffForHumans() : '-'),
                        Forms\Components\Placeholder::make('updated_at')
                            ->label(__('filament-blog::filament-blog.last_modified_at'))
                            ->content(fn (
                                ?Author $record
                            ): string => $record ? $record->updated_at->diffForHumans() : '-'),
                    ])
                    ->columnSpan(1),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('photo')
                    ->disk(config('filament-blog.avatar.disk', 'public'))
                    ->visibility(config('filament-blog.banner.visibility', 'public'))
                    ->label(__('filament-blog::filament-blog.photo'))
                    ->circular(),
                Tables\Columns\TextColumn::make('name')
                    ->label(__('filament-blog::filament-blog.name'))
                    ->searchable()
                    ->wrap()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label(__('filament-blog::filament-blog.email'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('github_handle')
                    ->label(__('filament-blog::filament-blog.github')),
                Tables\Columns\TextColumn::make('twitter_handle')
                    ->label(__('filament-blog::filament-blog.twitter')),
            ])
            ->filters([
                //
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
            'index' => Pages\ListAuthors::route('/'),
            'create' => Pages\CreateAuthor::route('/create'),
            'edit' => Pages\EditAuthor::route('/{record}/edit'),
        ];
    }

    public static function getPluralModelLabel(): string
    {
        return __('filament-blog::filament-blog.authors');
    }

    public static function getModelLabel(): string
    {
        return __('filament-blog::filament-blog.author');
    }
}
