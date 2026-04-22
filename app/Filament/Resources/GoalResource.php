<?php

namespace App\Filament\Resources;

use App\Enums\Currency;
use App\Filament\Resources\GoalResource\Pages;
use App\Filament\Resources\GoalResource\RelationManagers\GoalBannerRelationManager;
use App\Filament\Resources\GoalResource\RelationManagers\GoalGalleryRelationManager;
use App\Models\SponsorObjects\Goal;
use App\Models\ValueObjects\MoneyValue;
use App\Traits\HasContentEditor;
use Filament\Forms;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use IbrahimBougaoua\FilaProgress\Tables\Columns\ProgressBar;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Spatie\Tags\Tag;

class GoalResource extends Resource
{
    use HasContentEditor;

    protected static ?string $model = Goal::class;

    protected static ?string $slug = 'sponsor/goals';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $navigationGroup = 'Sponsor';

    protected static ?string $navigationIcon = 'fas-hand-holding-dollar';

    protected static ?int $navigationSort = 0;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(debounce: 500)
                            ->afterStateUpdated(function (Get $get, Set $set, ?string $old, ?string $state) {
                                if (($get('slug') ?? '') !== Str::slug($old)) {
                                    return;
                                }

                                $set('slug', Str::slug($state));
                            }),

                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->alphaDash()
                            ->maxLength(255)
                            ->suffixAction(
                                Action::make('generateSlug')
                                    ->label('Generate Slug')
                                    ->icon('fas-plus')
                                    ->action(function (Get $get, Set $set) {
                                        $title = $get('title');
                                        if (! empty($title)) {
                                            $set('slug', Str::slug($title));
                                        }
                                    })
                            )
                            ->unique(
                                table: 'goals',
                                column: 'slug',
                                ignorable: fn (?Goal $record) => $record,
                            ),

                        Forms\Components\Textarea::make('summary')
                            ->helperText('Short blurb shown on the goal index card.')
                            ->rows(2)
                            ->maxLength(500)
                            ->columnSpanFull(),

                        self::getContentEditor('description'),

                        Forms\Components\TextInput::make('target_amount')
                            ->required()
                            ->numeric()
                            ->step(0.01)
                            ->minValue(0.01)
                            ->prefix('$')
                            ->formatStateUsing(fn ($state) => $state instanceof MoneyValue ? $state->raw() : $state),

                        Forms\Components\Select::make('currency')
                            ->options(collect(Currency::getValues())->mapWithKeys(fn ($c) => [$c => $c]))
                            ->default('USD')
                            ->required()
                            ->native(false),
                    ])
                    ->columns([
                        'sm' => 2,
                    ])
                    ->columnSpan(2),

                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\DateTimePicker::make('published_at')
                            ->helperText('Leave blank to keep as draft.')
                            ->native(false),

                        Forms\Components\DateTimePicker::make('starts_at')
                            ->native(false),

                        Forms\Components\DateTimePicker::make('ends_at')
                            ->native(false)
                            ->after('starts_at'),

                        Forms\Components\Select::make('status')
                            ->options([
                                'active' => 'Active',
                                'paused' => 'Paused',
                                'closed' => 'Closed',
                            ])
                            ->default('active')
                            ->required()
                            ->native(false),

                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower numbers sort first.'),

                        SpatieTagsInput::make('tags')
                            ->helperText('Tag goals so external sites can filter via the public API (e.g. "one-mans-poison", "gdc").')
                            ->splitKeys(['Tab', ',']),
                    ])
                    ->columnSpan(1),
            ])
            ->columns(3);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Goal')
                    ->schema([
                        Infolists\Components\TextEntry::make('title'),
                        Infolists\Components\TextEntry::make('slug'),
                        Infolists\Components\TextEntry::make('summary')->columnSpanFull(),
                        Infolists\Components\TextEntry::make('target_amount')
                            ->label('Target')
                            ->formatStateUsing(fn ($state) => $state instanceof MoneyValue ? $state->symbolFormatted() : $state),
                        Infolists\Components\TextEntry::make('currency'),
                        Infolists\Components\TextEntry::make('status')->badge(),
                        Infolists\Components\IconEntry::make('is_active')
                            ->label('Live now')
                            ->boolean(),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Progress')
                    ->schema([
                        Infolists\Components\TextEntry::make('raised_amount')
                            ->label('Raised')
                            ->getStateUsing(fn (Goal $record) => $record->raised_amount->symbolFormatted()),
                        Infolists\Components\TextEntry::make('donor_count')
                            ->label('Supporters')
                            ->getStateUsing(fn (Goal $record) => $record->donor_count),
                        Infolists\Components\TextEntry::make('progress_percent')
                            ->label('Progress')
                            ->getStateUsing(fn (Goal $record) => round($record->progress_percent, 1).'%'),
                    ])
                    ->columns(3),

                Infolists\Components\Section::make('Timeline')
                    ->schema([
                        Infolists\Components\TextEntry::make('published_at')->dateTime(),
                        Infolists\Components\TextEntry::make('starts_at')->dateTime(),
                        Infolists\Components\TextEntry::make('ends_at')->dateTime(),
                    ])
                    ->columns(3),

                Infolists\Components\Section::make('Description')
                    ->schema([
                        Infolists\Components\TextEntry::make('description')
                            ->hiddenLabel()
                            ->html()
                            ->columnSpanFull(),
                    ])
                    ->visible(fn (Goal $record) => ! empty($record->description))
                    ->collapsed(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('banner_url')
                    ->label('Banner')
                    ->square(),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->wrap(),

                Tables\Columns\TextColumn::make('target_amount')
                    ->label('Target')
                    ->formatStateUsing(fn ($record) => $record->target_amount?->symbolFormatted())
                    ->sortable(),

                Tables\Columns\TextColumn::make('raised_amount')
                    ->label('Raised')
                    ->getStateUsing(fn (Goal $record) => $record->raised_amount->symbolFormatted()),

                Tables\Columns\TextColumn::make('donor_count')
                    ->label('Supporters')
                    ->getStateUsing(fn (Goal $record) => $record->donor_count),

                ProgressBar::make('progress')
                    ->label('Progress')
                    ->getStateUsing(fn (Goal $record) => [
                        'total' => $record->target_amount?->raw() ?? 0,
                        'progress' => $record->raised_amount->raw(),
                    ]),

                Tables\Columns\TextColumn::make('starts_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('ends_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->colors([
                        'success' => 'active',
                        'warning' => 'paused',
                        'danger' => 'closed',
                    ]),

                Tables\Columns\IconColumn::make('published_at')
                    ->label('Live')
                    ->boolean()
                    ->getStateUsing(fn (Goal $record) => $record->published_at && $record->published_at->isPast()),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'paused' => 'Paused',
                        'closed' => 'Closed',
                    ]),
                Tables\Filters\SelectFilter::make('tags')
                    ->label('Tag')
                    ->multiple()
                    ->options(fn () => Tag::query()->pluck('name', 'name'))
                    ->query(function (Builder $query, array $data): Builder {
                        $values = $data['values'] ?? [];

                        if (empty($values)) {
                            return $query;
                        }

                        return $query->withAnyTags($values);
                    }),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([SoftDeletingScope::class]);
    }

    public static function getRelations(): array
    {
        return [
            GoalBannerRelationManager::class,
            GoalGalleryRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGoals::route('/'),
            'create' => Pages\CreateGoal::route('/create'),
            'view' => Pages\ViewGoal::route('/{record}'),
            'edit' => Pages\EditGoal::route('/{record}/edit'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['title', 'slug', 'summary'];
    }
}
