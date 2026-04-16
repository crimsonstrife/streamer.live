<?php

namespace App\Filament\Resources\ContentEntries;

use App\Models\ContentObjects\ContentEntry;
use App\Models\ContentObjects\ContentField;
use App\Models\ContentObjects\ContentType;
use App\Services\ContentFieldFactory;
use Filament\Forms;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Indra\Revisor\Facades\Revisor;

abstract class ContentEntryResource extends Resource
{
    protected static ?string $model = ContentEntry::class;

    /**
     * Subclasses must return the ContentType this resource manages.
     */
    abstract public static function getContentType(): ContentType;

    abstract public static function getContentTypeId(): int;

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery()
            ->where('content_type_id', static::getContentTypeId());

        if (static::getContentType()->has_revisor) {
            $query->withDraftContext();
        }

        return $query;
    }

    public static function form(Form $form): Form
    {
        $contentType = static::getContentType();
        $fields = $contentType->getActiveFields();

        $dynamicFields = $fields
            ->map(fn (ContentField $field) => ContentFieldFactory::toFormComponent($field))
            ->filter()
            ->toArray();

        $schema = [
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
                        ->maxLength(255)
                        ->unique(
                            table: fn () => static::getContentType()->has_revisor
                                ? Revisor::getDraftTableFor('content_entries')
                                : 'content_entries',
                            column: 'slug',
                            ignorable: fn (?ContentEntry $record) => $record,
                            modifyRuleUsing: fn ($rule) => $rule->where('content_type_id', static::getContentTypeId()),
                        )
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
                        ),

                    Forms\Components\Hidden::make('content_type_id')
                        ->default(static::getContentTypeId()),
                ])
                ->columns(2),
        ];

        if (! empty($dynamicFields)) {
            $schema[] = Forms\Components\Section::make('Content')
                ->schema($dynamicFields)
                ->columns(2);
        }

        if ($contentType->has_tags) {
            $schema[] = Forms\Components\Section::make('Tags')
                ->schema([
                    \Filament\Forms\Components\SpatieTagsInput::make('tags')
                        ->type($contentType->slug),
                ])
                ->collapsed();
        }

        return $form->schema($schema);
    }

    public static function table(Table $table): Table
    {
        $contentType = static::getContentType();
        $fields = $contentType->getActiveFields();

        $columns = [
            Tables\Columns\TextColumn::make('title')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('slug')
                ->color('gray')
                ->toggleable(isToggledHiddenByDefault: true),
        ];

        // Add dynamic columns for fields marked show_in_table
        $fields->where('show_in_table', true)
            ->take(5) // Limit table columns to prevent overcrowding
            ->each(function (ContentField $field) use (&$columns) {
                $column = ContentFieldFactory::toTableColumn($field);
                if ($column) {
                    $columns[] = $column;
                }
            });

        if ($contentType->has_revisor) {
            $columns[] = \Indra\RevisorFilament\Filament\StatusColumn::make('revisor_status');
        }

        $columns[] = Tables\Columns\TextColumn::make('updated_at')
            ->dateTime()
            ->sortable()
            ->toggleable(isToggledHiddenByDefault: true);

        return $table
            ->columns($columns)
            ->defaultSort('updated_at', 'desc')
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

    // getPages() is defined by each generated resource subclass
    // via ContentEntryResourceRegistrar, since Filament requires
    // each page class to have a unique $resource binding.
}
