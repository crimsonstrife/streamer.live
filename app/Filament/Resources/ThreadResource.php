<?php

namespace App\Filament\Resources;

use App\Enums\ApprovalStatus;
use App\Filament\Resources\ThreadResource\Pages;
use App\Models\CommunityObjects\Thread;
use App\Models\SharedObjects\Category;
use App\Services\BBCodeService;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ThreadResource extends Resource
{
    protected static ?string $model = Thread::class;

    protected static ?string $slug = 'community/threads';

    protected static ?string $navigationGroup = 'Community';

    protected static ?string $navigationLabel = 'Threads';

    protected static ?string $navigationIcon = 'fas-comments';

    protected static ?int $navigationSort = 0;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->with(['user', 'category']);
    }

    public static function getNavigationBadge(): ?string
    {
        $count = Thread::query()->pendingReview()->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Content')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->required()
                        ->minLength(4)
                        ->maxLength(255)
                        ->columnSpanFull(),
                    Forms\Components\TextInput::make('slug')
                        ->disabled()
                        ->dehydrated(false)
                        ->columnSpanFull(),
                    Forms\Components\Textarea::make('body')
                        ->required()
                        ->rows(10)
                        ->minLength(10)
                        ->maxLength(10000)
                        ->columnSpanFull()
                        ->helperText('BBCode source. Saved as parsed XML; rendered as HTML on the forum.')
                        ->formatStateUsing(fn (?string $state) => app(BBCodeService::class)->unparse($state))
                        ->dehydrateStateUsing(fn (?string $state) => app(BBCodeService::class)->parse((string) $state)),
                    Forms\Components\Select::make('category_id')
                        ->label('Category')
                        ->options(fn () => Category::where('type', 'community')
                            ->pluck('name', 'id')
                            ->all())
                        ->searchable()
                        ->nullable(),
                    Forms\Components\Placeholder::make('user_label')
                        ->label('Author')
                        ->content(fn (?Thread $record) => $record?->user?->name ?? '—'),
                ])->columns(2),

            Forms\Components\Section::make('Moderation')
                ->schema([
                    Forms\Components\Select::make('approval_status')
                        ->label('Approval status')
                        ->options(ApprovalStatus::options())
                        ->required()
                        ->default(ApprovalStatus::Pending->value),
                    Forms\Components\Textarea::make('approval_notes')
                        ->label('Moderator notes (shown to author if rejected)')
                        ->rows(2)
                        ->columnSpanFull(),
                    Forms\Components\DateTimePicker::make('pinned_until')
                        ->label('Pinned until')
                        ->nullable()
                        ->native(false)
                        ->seconds(false)
                        ->helperText('Leave blank to unpin. Set to a future time to pin.'),
                    Forms\Components\Toggle::make('is_locked')
                        ->label('Lock replies'),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->wrap()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Author')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category.name')
                    ->label('Category')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('approval_status')
                    ->label('Status')
                    ->badge()
                    ->color(fn ($state) => match ($state instanceof ApprovalStatus ? $state : ApprovalStatus::tryFrom((string) $state)) {
                        ApprovalStatus::Pending => 'warning',
                        ApprovalStatus::Approved => 'success',
                        ApprovalStatus::Rejected => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn ($state) => ($state instanceof ApprovalStatus
                        ? $state
                        : ApprovalStatus::tryFrom((string) $state))?->label() ?? $state),
                Tables\Columns\IconColumn::make('is_pinned_virtual')
                    ->label('Pinned')
                    ->boolean()
                    ->getStateUsing(fn (Thread $r) => $r->isPinned())
                    ->toggleable(),
                Tables\Columns\IconColumn::make('is_locked')
                    ->label('Locked')
                    ->boolean()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('posts_count')
                    ->label('Replies')
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('last_activity_at')
                    ->label('Last activity')
                    ->since()
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->since()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('approval_status')
                    ->options(ApprovalStatus::options()),
                Tables\Filters\SelectFilter::make('category_id')
                    ->label('Category')
                    ->options(fn () => Category::where('type', 'community')->pluck('name', 'id')->all()),
                Tables\Filters\TernaryFilter::make('is_locked')->label('Locked'),
                Tables\Filters\Filter::make('pinned')
                    ->label('Currently pinned')
                    ->query(fn (Builder $q) => $q->whereNotNull('pinned_until')->where('pinned_until', '>', now())),
            ])
            ->actions([
                Tables\Actions\Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (Thread $r) => $r->approval_status !== ApprovalStatus::Approved
                        && (auth()->user()?->isModerator() || auth()->user()?->isAdmin()))
                    ->action(function (Thread $record) {
                        $record->forceFill([
                            'approval_status' => ApprovalStatus::Approved->value,
                            'approval_reviewed_by' => auth()->id(),
                            'approval_reviewed_at' => now(),
                            'approval_notes' => null,
                        ])->save();
                    })
                    ->requiresConfirmation(),

                Tables\Actions\Action::make('reject')
                    ->label('Reject')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn (Thread $r) => $r->approval_status !== ApprovalStatus::Rejected
                        && (auth()->user()?->isModerator() || auth()->user()?->isAdmin()))
                    ->form([
                        Forms\Components\Textarea::make('notes')
                            ->label('Reason (shown to author)')
                            ->required()
                            ->rows(3),
                    ])
                    ->action(function (Thread $record, array $data) {
                        $record->forceFill([
                            'approval_status' => ApprovalStatus::Rejected->value,
                            'approval_reviewed_by' => auth()->id(),
                            'approval_reviewed_at' => now(),
                            'approval_notes' => $data['notes'],
                        ])->save();
                    }),

                Tables\Actions\Action::make('togglePin')
                    ->label(fn (Thread $r) => $r->isPinned() ? 'Unpin' : 'Pin 7 days')
                    ->icon('fas-thumbtack')
                    ->visible(fn () => auth()->user()?->isModerator() || auth()->user()?->isAdmin())
                    ->action(function (Thread $record) {
                        $record->pinned_until = $record->isPinned() ? null : now()->addDays(7);
                        $record->save();
                    }),

                Tables\Actions\Action::make('toggleLock')
                    ->label(fn (Thread $r) => $r->is_locked ? 'Unlock' : 'Lock')
                    ->icon('heroicon-o-lock-closed')
                    ->visible(fn () => auth()->user()?->isModerator() || auth()->user()?->isAdmin())
                    ->action(function (Thread $record) {
                        $record->is_locked = ! $record->is_locked;
                        $record->save();
                    }),

                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkAction::make('bulkApprove')
                    ->label('Approve selected')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn () => auth()->user()?->isModerator() || auth()->user()?->isAdmin())
                    ->action(function ($records) {
                        foreach ($records as $record) {
                            $record->forceFill([
                                'approval_status' => ApprovalStatus::Approved->value,
                                'approval_reviewed_by' => auth()->id(),
                                'approval_reviewed_at' => now(),
                                'approval_notes' => null,
                            ])->save();
                        }
                    })
                    ->requiresConfirmation(),
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListThreads::route('/'),
            'edit' => Pages\EditThread::route('/{record}/edit'),
        ];
    }
}
