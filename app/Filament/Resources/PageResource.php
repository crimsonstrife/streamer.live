<?php

namespace App\Filament\Resources;

use Closure;
use Filament\Forms;
use Filament\Forms\Components\Actions\Action as FormAction;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieTagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Unique;
use Z3d0X\FilamentFabricator\Facades\FilamentFabricator;
use Z3d0X\FilamentFabricator\Forms\Components\PageBuilder;
use Z3d0X\FilamentFabricator\Models\Contracts\Page as PageContract;
use Z3d0X\FilamentFabricator\Resources\PageResource as BasePageResource;
use Z3d0X\FilamentFabricator\Resources\PageResource\Pages;
use Z3d0X\FilamentFabricator\View\ResourceSchemaSlot;

class PageResource extends BasePageResource
{
    protected static ?string $navigationIcon = 'fas-file';
    protected static ?string $navigationGroup = 'CMS';
    protected static ?string $slug = 'cms/pages';
    protected static ?int $navigationSort = 0;

    public static function form(Form $form): Form
    {
        // get the base page form:
        $baseForm = parent::form($form);

        // insert an SEO tab after the blocks section:
        return $baseForm
            ->columns(3)
            ->schema([
                Group::make()
                    ->schema([
                        Group::make()->schema(FilamentFabricator::getSchemaSlot(ResourceSchemaSlot::BLOCKS_BEFORE)),

                        PageBuilder::make('blocks')
                            ->label(__('filament-fabricator::page-resource.labels.blocks')),

                        Group::make()->schema(FilamentFabricator::getSchemaSlot(ResourceSchemaSlot::BLOCKS_AFTER)),
                    ])
                    ->columnSpan(2),
                Group::make()
                    ->columnSpan(1)
                    ->schema([
                        Group::make()->schema(FilamentFabricator::getSchemaSlot(ResourceSchemaSlot::SIDEBAR_BEFORE)),

                        Section::make()
                            ->schema([
                                Placeholder::make('page_url')
                                    ->label(__('filament-fabricator::page-resource.labels.url'))
                                    ->visible(fn (?PageContract $record) => config('filament-fabricator.routing.enabled') && filled($record))
                                    ->content(fn (?PageContract $record) => FilamentFabricator::getPageUrlFromId($record?->id)),

                                TextInput::make('title')
                                    ->label(__('filament-fabricator::page-resource.labels.title'))
                                    ->afterStateUpdated(function (Get $get, Set $set, ?string $state, ?PageContract $record) {
                                        if (! $get('is_slug_changed_manually') && filled($state) && blank($record)) {
                                            $set('slug', Str::slug($state, language: config('app.locale', 'en')));
                                        }
                                    })
                                    ->debounce('500ms')
                                    ->required(),

                                Hidden::make('is_slug_changed_manually')
                                    ->default(false)
                                    ->dehydrated(false),

                                TextInput::make('slug')
                                    ->label(__('filament-fabricator::page-resource.labels.slug'))
                                    ->unique(ignoreRecord: true, modifyRuleUsing: fn (Unique $rule, Get $get) => $rule->where('parent_id', $get('parent_id')))
                                    ->afterStateUpdated(function (Set $set) {
                                        $set('is_slug_changed_manually', true);
                                    })
                                    ->rule(function ($state) {
                                        return function (string $attribute, $value, Closure $fail) use ($state) {
                                            if ($state !== '/' && (Str::startsWith($value, '/') || Str::endsWith($value, '/'))) {
                                                $fail(__('filament-fabricator::page-resource.errors.slug_starts_or_ends_with_slash'));
                                            }
                                        };
                                    })
                                    ->required(),

                                Select::make('layout')
                                    ->label(__('filament-fabricator::page-resource.labels.layout'))
                                    ->options(FilamentFabricator::getLayouts())
                                    ->default(fn () => FilamentFabricator::getDefaultLayoutName())
                                    ->live()
                                    ->required(),

                                Select::make('parent_id')
                                    ->label(__('filament-fabricator::page-resource.labels.parent'))
                                    ->searchable()
                                    ->preload()
                                    ->reactive()
                                    ->suffixAction(
                                        fn ($get, $context) => FormAction::make($context . '-parent')
                                            ->icon('heroicon-o-arrow-top-right-on-square')
                                            ->url(fn () => \Z3d0X\FilamentFabricator\Resources\PageResource::getUrl($context, ['record' => $get('parent_id')]))
                                            ->openUrlInNewTab()
                                            ->visible(fn () => filled($get('parent_id')))
                                    )
                                    ->relationship(
                                        'parent',
                                        'title',
                                        function (Builder $query, ?PageContract $record) {
                                            if (filled($record)) {
                                                $query->where('id', '!=', $record->id);
                                            }
                                        }
                                    ),
                            ]),

                        Section::make()
                            ->schema([
                                Forms\Components\TextInput::make('seo_title')
                                    ->label('SEO Title')
                                    ->maxLength(70)
                                    ->helperText('If blank, page title will be used'),
                                Forms\Components\Textarea::make('seo_description')
                                    ->label('Meta Description')
                                    ->maxLength(160),
                                SpatieTagsInput::make('seo_keyword')
                                    ->label('SEO Keywords')
                                    ->hint('Select or create your keywords'),
                            ]),

                        Group::make()->schema(FilamentFabricator::getSchemaSlot(ResourceSchemaSlot::SIDEBAR_AFTER)),
                    ]),
            ]);
    }

    public static function getModelLabel(): string
    {
        return __('filament-fabricator::page-resource.labels.page');
    }

    public static function getPluralModelLabel(): string
    {
        return __('filament-fabricator::page-resource.labels.pages');
    }

    public static function getPages(): array
    {
        return array_filter([
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'view' => config('filament-fabricator.enable-view-page') ? Pages\ViewPage::route('/{record}') : null,
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ]);
    }
}
