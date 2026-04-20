<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Filament\Resources\PostResource\RelationManagers\PostFeaturedImageRelationManager;
use App\Models\AuthObjects\User;
use App\Models\BlogObjects\Author;
use App\Models\BlogObjects\Post;
use App\Traits\HasContentEditor;
use Filament\Forms;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;
use Indra\RevisorFilament\Filament\StatusColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Indra\Revisor\Facades\Revisor;

class PostResource extends Resource
{
    use HasContentEditor;

    protected static ?string $model = Post::class;

    protected static ?string $slug = 'blog/posts';

    protected static ?string $recordTitleAttribute = 'title';

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->withDraftContext();
    }

    protected static ?string $navigationGroup = 'Blog';

    protected static ?string $navigationIcon = 'fas-thumbtack';

    protected static ?int $navigationSort = 0;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label(__('filament-blog::filament-blog.title'))
                            ->required()
                            ->live(debounce: 500)
                            ->afterStateUpdated(function (Get $get, Set $set, ?string $old, ?string $state) {
                                if (($get('slug') ?? '') !== Str::slug($old)) {
                                    return;
                                }

                                $set('slug', Str::slug($state));
                            }),

                        Forms\Components\TextInput::make('slug')
                            ->label(__('filament-blog::filament-blog.slug'))
                            ->required()
                            ->suffixAction(
                                Action::make('generateSlug')
                                    ->label('Generate Slug')
                                    ->icon('fas-plus')
                                    ->action(function ($get, $set) {
                                        $title = $get('title');
                                        if (! empty($title)) {
                                            $set('slug', Str::slug($title));
                                        }
                                    })
                            )
                            ->unique(
                                table: fn () => Revisor::getDraftTableFor((new Post)->getBaseTable()),
                                column: 'slug',
                                ignorable: fn (?Post $record) => $record,
                            ),

                        Forms\Components\Textarea::make('excerpt')
                            ->label(__('filament-blog::filament-blog.excerpt'))
                            ->rows(2)
                            ->minLength(50)
                            ->maxLength(1000)
                            ->columnSpan([
                                'sm' => 2,
                            ]),

                        Forms\Components\FileUpload::make('featured_image')
                        ->disk(config('filesystems.upload_disk', 'public'))
                        ->directory('posts')
                        ->multiple(false),

                        self::getContentEditor('content'),

                        Forms\Components\Select::make('blog_author_id')
                            ->label(__('filament-blog::filament-blog.author'))
                            ->relationship(name: 'author', titleAttribute: 'name')
                            ->searchable()
                            ->required()
                            ->default(function () {
                                return auth()->user()?->blogAuthor?->id;
                            })
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required(),
                                Forms\Components\TextInput::make('email')
                                    ->required()
                                    ->email(),
                                Forms\Components\Select::make('user_id')
                                    ->label('Linked User')
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->getOptionLabelFromRecordUsing(fn ($record) => $record->name) // Uses accessor safely
                                    ->disabled(fn (?Author $record) => $record?->user_id && ! auth()->user()->can('updateUserLink'))
                                    ->options(function (?Author $record) {
                                        $query = User::query();

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
                            ])
                            ->searchable()
                            ->required(),

                        Forms\Components\Select::make('blog_category_id')
                            ->label(__('filament-blog::filament-blog.category'))
                            ->relationship(
                                name: 'category',
                                titleAttribute: 'name',
                                modifyQueryUsing: fn (Builder $query) => $query->where('type', 'blog')
                            )
                            ->searchable()
                            ->required(),

                        SpatieTagsInput::make('tags')
                            ->label(__('filament-blog::filament-blog.tags'))->type('blog'),
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
                                ?Post $record
                            ): string => $record ? $record->created_at->diffForHumans() : '-'),
                        Forms\Components\Placeholder::make('updated_at')
                            ->label(__('filament-blog::filament-blog.last_modified_at'))
                            ->content(fn (
                                ?Post $record
                            ): string => $record ? $record->updated_at->diffForHumans() : '-'),
                        Forms\Components\Toggle::make('comments_locked')
                            ->label('Lock Comments')
                            ->helperText('When enabled, no new comments can be added to this post.')
                            ->columnSpan('full'),
                    ])
                    ->columnSpan(1),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('id')
                    ->label('Preview')
                    ->getStateUsing(fn ($record) => $record->getFirstMediaUrl('posts'))
                    ->square(),
                Tables\Columns\TextColumn::make('title')
                    ->label(__('filament-blog::filament-blog.title'))
                    ->searchable()
                    ->wrap()
                    ->sortable(),
                Tables\Columns\TextColumn::make('author.name')
                    ->label(__('filament-blog::filament-blog.author_name'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label(__('filament-blog::filament-blog.category_name'))
                    ->searchable()
                    ->sortable(),
                StatusColumn::make('revisor_status'),
            ])->defaultSort(config('filament-blog.sort.column', 'published_at'), config('filament-blog.sort.direction', 'asc'))
            ->filters([]);
    }

    public static function getRelations(): array
    {
        return [
            PostFeaturedImageRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
            'versions' => Pages\ListPostVersions::route('/{record}/versions'),
            'view_version' => Pages\ViewPostVersion::route('/{record}/versions/{version}'),
        ];
    }

    public static function getGlobalSearchEloquentQuery(): Builder
    {
        return parent::getGlobalSearchEloquentQuery()->with(['author', 'category']);
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['title', 'slug', 'author.name', 'category.name'];
    }

    public static function getGlobalSearchResultDetails(Model $record): array
    {
        /** @var Post $record */
        $details = [];

        if ($record->author) {
            $details['Author'] = $record->author->name;
        }

        if ($record->category) {
            $details['Category'] = $record->category->name;
        }

        return $details;
    }

    public static function getPluralModelLabel(): string
    {
        return __('filament-blog::filament-blog.posts');
    }

    public static function getModelLabel(): string
    {
        return __('filament-blog::filament-blog.post');
    }
}
