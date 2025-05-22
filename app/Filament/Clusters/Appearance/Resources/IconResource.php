<?php

namespace App\Filament\Clusters\Appearance\Resources;

use App\Filament\Clusters\Appearance;
use App\Filament\Clusters\Appearance\Resources\IconResource\Pages;
use App\Models\Icon;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class IconResource extends Resource
{
    protected static ?string $model = Icon::class;

    protected static ?string $navigationIcon = 'fas-icons';

    protected static ?string $navigationGroup = 'Appearance';

    protected static ?string $cluster = Appearance::class;

    protected static ?int $navigationSort = 5;

    protected static bool $search = true;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Name
                Forms\Components\TextInput::make('name')
                    ->label('Icon Name')
                    ->required()
                    ->reactive()
                    ->disabled(fn ($get) => $get('is_builtin'))
                    ->helperText('Lowercase, hyphens for spaces.')
                    ->afterStateUpdated(fn ($state, callable $set) => $set('name', Str::slug($state, '-')))
                    ->rule(fn ($get) => Rule::unique('icons', 'name')
                        ->where(fn ($query) => $query
                            ->when($get('type'), fn ($q) => $q->where('type', $get('type')))
                            ->when($get('style'), fn ($q) => $q->where('style', $get('style')))
                        )
                    )
                    ->validationAttribute('name'),

                // Style
                Forms\Components\Select::make('style')
                    ->label('Icon Style')
                    ->options(Icon::styles()->mapWithKeys(fn ($s) => [$s => Str::title($s)]))
                    ->required()
                    ->reactive()
                    ->disabled(fn ($get) => $get('is_builtin'))
                    ->helperText('Choose a style (outline/solid/etc).')
                    ->afterStateUpdated(fn ($state, callable $set, $get) => $set('set', ($get('type') ?? '').'-'.$state)),

                // Type
                Forms\Components\Select::make('type')
                    ->label('Icon Type')
                    ->options(Icon::availableTypes())
                    ->required()
                    ->searchable()
                    ->reactive()
                    ->disabled(fn ($get) => $get('is_builtin'))
                    ->helperText('Choose a pack (Heroicons/FontAwesome/etc).')
                    ->afterStateUpdated(fn ($state, callable $set, $get) => $set('set', $state.'-'.($get('style') ?? ''))),

                // Hidden “set”
                Forms\Components\Hidden::make('set')
                    ->default(fn ($get) => $get('type').'-'.$get('style'))
                    ->reactive()
                    ->dehydrated()
                    ->disabled(fn ($get) => $get('is_builtin'))
                    ->afterStateHydrated(function ($state, callable $set) {
                        $mapP = Icon::prefixMap();
                        $mapC = Icon::classMap();
                        $set('prefix', $mapP[$state] ?? 'custom-c');
                        $set('class', $mapC[$state] ?? 'custom-icon-set custom-icon');
                    })
                    ->afterStateUpdated(function ($state, callable $set) {
                        $mapP = Icon::prefixMap();
                        $mapC = Icon::classMap();
                        $set('prefix', $mapP[$state] ?? 'custom-c');
                        $set('class', $mapC[$state] ?? 'custom-icon-set custom-icon');
                    }),

                // Hidden “prefix” & “class”
                Forms\Components\Hidden::make('prefix')
                    ->default(fn ($get) => Icon::prefixMap()[$get('set')] ?? 'custom-c')
                    ->reactive()
                    ->dehydrated()
                    ->disabled(fn ($get) => $get('is_builtin')),

                Forms\Components\Hidden::make('class')
                    ->default(fn ($get) => Icon::classMap()[$get('set')] ?? 'custom-icon-set custom-icon')
                    ->reactive()
                    ->dehydrated()
                    ->disabled(fn ($get) => $get('is_builtin')),

                // File upload
                Forms\Components\FileUpload::make('svg_file_path')
                    ->label('Upload SVG File')
                    ->disk('local')
                    ->directory(fn ($get) => Icon::$storagePath."/custom/{$get('type')}/{$get('style')}")
                    ->acceptedFileTypes(['image/svg+xml'])
                    ->helperText('Takes priority over SVG code.')
                    ->visible(fn ($get) => $get('type') === 'custom')
                    ->disabled(fn ($get) => $get('is_builtin'))
                    ->reactive()
                    ->dehydrated()
                    ->afterStateHydrated(fn ($state, callable $set) => $set('svg_file_path', $state ? [$state] : [])),

                // Inline SVG code
                Forms\Components\Textarea::make('svg_code')
                    ->label('Custom SVG Code')
                    ->helperText('Paste code if no file.')
                    ->visible(fn ($get) => $get('type') === 'custom' && ! $get('svg_file_path'))
                    ->reactive()
                    ->disabled(fn ($get) => $get('is_builtin')),

                // Live preview
                Forms\Components\Placeholder::make('preview')
                    ->label('Live Preview')
                    ->content(fn (callable $get): HtmlString => new HtmlString(
                        view('components.icon-display', [
                            'icon_id' => $get('id'),
                        ])->render()
                    )),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('Icon Name')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('type')->label('Type')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('style')->label('Style')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('blade_snippet')
                    ->label('Blade Tag Snippet')
                    ->badge()
                    ->formatStateUsing(fn (Icon $record): string => $record->blade_snippet)
                    ->copyable()
                    ->copyMessage('Tag copied')
                    ->copyMessageDuration(1500)
                    ->tooltip('Click to copy this Blade tag, used to render the icon in blade files.'),
                Tables\Columns\IconColumn::make('blade_code')
                    ->icon(fn (Icon $record): string => $record->blade_code)
                    ->label('Preview'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->label('Type')
                    ->options(Icon::types()->mapWithKeys(fn ($t) => [$t => Str::title($t)]))
                    ->placeholder('All Types'),
                Tables\Filters\SelectFilter::make('style')
                    ->label('Style')
                    ->options(Icon::styles()->mapWithKeys(fn ($s) => [$s => Str::title($s)]))
                    ->placeholder('All Styles'),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListIcons::route('/'),
            // 'create' => Pages\CreateIcon::route('/create'),
            // 'edit' => Pages\EditIcon::route('/{record}/edit'),
        ];
    }
}
