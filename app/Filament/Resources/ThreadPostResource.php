<?php

namespace App\Filament\Resources;

use App\Enums\ApprovalStatus;
use App\Filament\Resources\ThreadPostResource\Pages;
use App\Models\CommunityObjects\ThreadPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ThreadPostResource extends Resource
{
    protected static ?string $model = ThreadPost::class;

    protected static ?string $slug = 'community/replies';

    protected static ?string $navigationGroup = 'Community';

    protected static ?string $navigationLabel = 'Replies';

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?int $navigationSort = 1;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->with(['user', 'thread']);
    }

    public static function getNavigationBadge(): ?string
    {
        $count = ThreadPost::query()->pendingReview()->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Placeholder::make('thread_title')
                ->label('Thread')
                ->content(fn (?ThreadPost $record) => $record?->thread?->title ?? '—')
                ->columnSpanFull(),
            Forms\Components\Placeholder::make('user_label')
                ->label('Author')
                ->content(fn (?ThreadPost $record) => $record?->user?->name ?? '—'),
            Forms\Components\Textarea::make('body')
                ->required()
                ->rows(8)
                ->columnSpanFull(),
            Forms\Components\Select::make('approval_status')
                ->label('Approval status')
                ->options(ApprovalStatus::options())
                ->required(),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('thread.title')
                    ->label('Thread')
                    ->searchable()
                    ->wrap()
                    ->limit(40),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Author')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('body')
                    ->limit(60)
                    ->wrap(),
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
                Tables\Columns\TextColumn::make('created_at')
                    ->since()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('approval_status')
                    ->options(ApprovalStatus::options()),
            ])
            ->actions([
                Tables\Actions\Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (ThreadPost $r) => $r->approval_status !== ApprovalStatus::Approved
                        && (auth()->user()?->isModerator() || auth()->user()?->isAdmin()))
                    ->action(fn (ThreadPost $record) => $record->update(['approval_status' => ApprovalStatus::Approved->value]))
                    ->requiresConfirmation(),
                Tables\Actions\Action::make('reject')
                    ->label('Reject')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn (ThreadPost $r) => $r->approval_status !== ApprovalStatus::Rejected
                        && (auth()->user()?->isModerator() || auth()->user()?->isAdmin()))
                    ->action(fn (ThreadPost $record) => $record->update(['approval_status' => ApprovalStatus::Rejected->value]))
                    ->requiresConfirmation(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListThreadPosts::route('/'),
            'edit' => Pages\EditThreadPost::route('/{record}/edit'),
        ];
    }
}
