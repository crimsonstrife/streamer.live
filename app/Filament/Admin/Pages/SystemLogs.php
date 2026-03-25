<?php

namespace App\Filament\Admin\Pages;

use AchyutN\FilamentLogViewer\Enums\LogLevel;
use AchyutN\FilamentLogViewer\Filters\DateRangeFilter;
use AchyutN\FilamentLogViewer\Model\Log;
use App\Models\AuthObjects\User;
use Filament\Infolists\Components\RepeatableEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Pages\Page;
use Filament\Resources\Components\Tab;
use Filament\Support\Colors\Color;
use Filament\Tables;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Livewire\Attributes\Url;

class SystemLogs extends Page implements HasTable
{
    use InteractsWithTable;

    protected static ?string $navigationIcon = 'fas-file-lines';

    protected static ?string $navigationLabel = 'System Logs';

    protected static ?string $navigationGroup = 'Settings';

    protected static ?int $navigationSort = 100;

    protected static ?string $slug = 'logs';

    protected static string $view = 'filament.admin.pages.system-logs';

    #[Url(except: null)]
    public ?string $activeTab = null;

    /**
     * @var array<string | int, Tab>
     */
    private array $cachedTabs;

    public static function canAccess(): bool
    {
        $user = auth()->user();

        return $user instanceof User && $user->canViewSystemLogs();
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(Log::query())
            ->modifyQueryUsing(function (Builder $query): void {
                if ($this->activeTab) {
                    $query->where('log_level', $this->activeTab);
                }
            })
            ->columns([
                Tables\Columns\TextColumn::make('log_level')
                    ->badge(),
                Tables\Columns\TextColumn::make('env')
                    ->label('Environment')
                    ->color(fn (string $state): array => match ($state) {
                        'local' => Color::Blue,
                        'production' => Color::Red,
                        'staging' => Color::Orange,
                        'testing' => Color::Gray,
                        default => Color::Yellow,
                    })
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->badge(),
                Tables\Columns\TextColumn::make('file')
                    ->label('File Name')
                    ->badge()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('message')
                    ->label('Summary')
                    ->searchable()
                    ->wrap(),
                Tables\Columns\TextColumn::make('date')
                    ->label('Occurred')
                    ->since()
                    ->dateTimeTooltip()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make('view')
                    ->infolist([
                        RepeatableEntry::make('stack')
                            ->hiddenLabel()
                            ->schema([
                                TextEntry::make('trace')
                                    ->hiddenLabel()
                                    ->columnSpanFull(),
                            ])
                            ->label('Stack Trace'),
                    ])
                    ->slideOver(),
            ])
            ->filters([
                DateRangeFilter::make('date'),
            ])
            ->defaultSort('date', 'desc');
    }

    /**
     * @return array<string | int, Tab>
     */
    public function getCachedTabs(): array
    {
        return $this->cachedTabs ??= $this->getTabs();
    }

    /**
     * @return array<string | int, Tab>
     */
    public function getTabs(): array
    {
        $allLogs = [
            null => Tab::make('All Logs')
                ->badge(fn (): ?int => Log::query()->count() ?: null),
        ];

        $tabs = collect(LogLevel::cases())
            ->mapWithKeys(fn (LogLevel $level): array => [
                $level->value => Tab::make($level->getLabel())
                    ->badge(fn (): ?int => Log::query()->where('log_level', $level)->count() ?: null)
                    ->badgeColor($level->getColor()),
            ])
            ->toArray();

        return array_merge($allLogs, $tabs);
    }

    public function getDefaultActiveTab(): null
    {
        return null;
    }

    public function updateTab(?LogLevel $level): void
    {
        $this->activeTab = $level?->value;
    }
}
