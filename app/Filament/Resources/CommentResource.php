<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CommentResource\Pages;
use App\Filament\Resources\CommentResource\RelationManagers\ActivityLogsRelationManager;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Exception;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\View;
use Filament\Resources\Resource;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\BulkAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class CommentResource extends Resource
{
    protected static ?string $model = Comment::class;

    protected static ?string $slug = 'blog/comments';

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Blog';

    public static function getEloquentQuery(): Builder
    {
        // Instantiate the class held by static::$model and get its table name.
        $table = (new static::$model)->getTable();

        return parent::getEloquentQuery()
            // make sure to still pull in all comment columns
            ->select("{$table}.*")
            // eager-load the user who made the comment
            ->with([
                'commentedBy',
                'commentedOn',
                // load first‐level replies
                'replies' => fn ($q) => $q->with('commentedBy'),
                // and two more levels deep (adjust as needed)
                'replies.replies' => fn ($q) => $q->with('commentedBy'),
                'replies.replies.replies' => fn ($q) => $q->with('commentedBy'),
            ])
            ->addScore();
    }

    /**
     * @throws Exception
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->label('ID')->sortable(),
                TextColumn::make('author')
                    ->label('Author')
                    ->sortable('commented_by_id')
                    ->searchable()
                    ->getStateUsing(
                        fn (Comment $record) => // try name…
                        $record->commentedBy?->name
                        // …otherwise username…
                        ?? $record->commentedBy?->username
                        // …otherwise email…
                        ?? $record->commentedBy?->email
                        // …otherwise a dash
                        ?? '—'
                    ),
                TextColumn::make('commentedOn')
                    ->label('On')
                    // display the related model’s title (or fallback to Type #ID)
                    ->getStateUsing(
                        fn (Comment $record) => optional($record->commentedOn)->title
                        ?? class_basename($record->commented_on_type)
                        .' #'
                        .$record->commented_on_id
                    )
                    // link to it using its slug (route key)
                    ->url(
                        fn (Comment $record): ?string => $record->commentedOn
                        ? match ($record->commented_on_type) {
                            Post::class => PostResource::getUrl('edit', [
                                'record' => $record->commentedOn->getRouteKey(),
                            ]),
                            default => null,
                        }
                        : null
                    )
                    ->openUrlInNewTab(),
                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime()          // renders a human-readable datetime
                    ->since()             // “2 hours ago” style
                    ->sortable(),
                TextColumn::make('text')
                    ->label('Comment')
                    ->limit(50)
                    ->wrap(),
                TextColumn::make('score')
                    ->label('Reputation Score')
                    ->sortable(),
                TextColumn::make('spam_score')
                    ->label('Spam Risk Score')
                    ->sortable()
                    ->color(fn ($state) => match (true) {
                        $state >= 5 => 'danger',   // very high risk
                        $state >= 2 => 'warning',  // medium risk
                        default => 'success',  // low risk
                    })
                    ->tooltip(fn ($state) => "Composite spam score: {$state}"),
                IconColumn::make('approved')
                    ->label('Approved')
                    ->boolean()
                    ->sortable(),
                IconColumn::make('is_spam')
                    ->label('Spam')
                    ->boolean()
                    ->sortable(),
                IconColumn::make('is_spam_auto')
                    ->label('Auto-Spam')
                    ->boolean()
                    ->trueIcon('heroicon-o-shield-exclamation')
                    ->falseIcon('heroicon-o-shield-check')
                    ->sortable(),
            ])
            ->filters([
                Filter::make('search')
                    ->label('Search Text')
                    ->form([
                        TextInput::make('search')
                            ->label('Search comments…')
                            ->placeholder('Enter keywords…')
                            ->columnSpan('full'),
                    ])
                    ->query(
                        fn (Builder $query, array $data) => $query
                            ->when(
                                $data['search'],
                                fn (Builder $q, $search) => $q->where('text', 'like', "%{$search}%")
                            )
                    ),
                Filter::make('approved')
                    ->label('Approved')
                    ->query(fn (Builder $q) => $q->where('approved', true)),
                Filter::make('unapproved')
                    ->label('Unapproved')
                    ->query(fn (Builder $q) => $q->where('approved', false)),
                Filter::make('auto_spam')
                    ->label('Auto-flagged Spam')
                    ->query(fn (Builder $query) => $query->where('is_spam_auto', true)),
                Filter::make('high_risk')
                    ->label('Spam Risk Score ≥ 2')
                    ->query(fn (Builder $q) => $q->where('spam_score', '>=', 2)),
                Filter::make('spam')
                    ->label('Spam')
                    ->query(fn (Builder $q) => $q->where('is_spam', true)),
                Filter::make('contains_urls')
                    ->label('Contains URLs')
                    ->query(fn (Builder $query) => $query->where(function (Builder $q) {
                        // Pattern for bare URLs: http:// or https:// followed by any non-space, non-quote, non-)] characters
                        $bare = 'https?://[^[:space:]"\'\)\]]+';
                        // Pattern for Markdown links: [text](http://...)
                        $md = '\[[^]]+\]\(https?://[^)]+\)';
                        // Run either regex
                        $q->where('text', 'regexp', $bare)
                            ->orWhere('text', 'regexp', $md);
                    })),
                Filter::make('commented_by_id')
                    ->label('By Author')
                    ->form([
                        Select::make('commented_by_id')
                            ->label('Commenter')
                            // load all users as [id => name]
                            ->options(fn () => User::pluck('users.username', 'id')->toArray())
                            ->searchable()
                            ->preload()
                            ->placeholder('Any author'),
                    ])
                    ->query(
                        fn (Builder $query, array $data) => $query
                            ->when(
                                $data['commented_by_id'],
                                fn (Builder $q, $id) => $q->where('commented_by_id', $id),
                            )
                    ),
                Filter::make('date_range')
                    ->label('Created Between')
                    ->form([
                        DatePicker::make('created_from')
                            ->label('From')
                            ->placeholder('Start date'),
                        DatePicker::make('created_until')
                            ->label('Until')
                            ->placeholder('End date'),
                    ])
                    ->query(
                        fn (Builder $query, array $data) => $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $q, $date) => $q->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $q, $date) => $q->whereDate('created_at', '<=', $date),
                            )
                    ),
            ])
            ->actions([
                ViewAction::make()
                    ->label('View')
                    ->icon('heroicon-o-eye'),
                EditAction::make(),
                Action::make('viewThread')
                    ->label('View Thread')
                    ->icon('heroicon-o-chat-bubble-left-ellipsis')
                    ->modalHeading('Comment Thread')
                    ->modalWidth('2xl')
                    ->modalContent(
                        fn (Comment $record) => // Return the View instance, not a string
                    view('filament.components.comment-thread', [
                        'comment' => $record,
                    ])
                    ),
                Action::make('reply')
                    ->label('Reply')
                    ->icon('heroicon-o-chat-bubble-left-ellipsis')
                    ->form([
                        Forms\Components\Textarea::make('reply_text')
                            ->label('Your reply')
                            ->required()
                            ->rows(3),
                    ])
                    ->action(function (Comment $record, array $data) {
                        Comment::create([
                            'text' => $data['reply_text'],
                            'reply_id' => $record->id,
                            'commented_on_type' => $record->commented_on_type,
                            'commented_on_id' => $record->commented_on_id,
                            'commented_by_type' => get_class(Auth::user()),
                            'commented_by_id' => Auth::id(),
                            'approved' => true,
                            'is_spam' => false,
                        ]);
                        // $this->notify('success', 'Reply posted');
                    }),
                DeleteAction::make(),  // optional
            ])
            ->bulkActions([
                BulkAction::make('approve')
                    ->label('Mark as Approved')
                    ->action(fn ($records) => $records->each->update(['approved' => true]))
                    ->deselectRecordsAfterCompletion()
                    ->successNotificationTitle('Comments approved'),
                BulkAction::make('spam')
                    ->label('Mark as Spam')
                    ->action(fn ($records) => $records->each->update(['is_spam' => true]))
                    ->deselectRecordsAfterCompletion()
                    ->successNotificationTitle('Comments marked as spam'),
                BulkAction::make('not_spam')
                    ->label('Not Spam')
                    ->action(fn ($records) => $records->each->update(['is_spam' => false]))
                    ->deselectRecordsAfterCompletion()
                    ->successNotificationTitle('Comments un‐flagged as spam'),
                BulkAction::make('destroy')
                    ->label('Destroy Permanently')
                    ->requiresConfirmation()
                    ->color('danger')
                    ->action(fn ($records) => $records->each->forceDelete())
                    ->deselectRecordsAfterCompletion()
                    ->successNotificationTitle('Comments permanently deleted'),
                BulkAction::make('ban_user')
                    ->label('Ban User')
                    ->requiresConfirmation()
                    ->action(function ($records) {
                        // collect unique commenter IDs
                        $records
                            ->pluck('commented_by_id')
                            ->unique()
                            ->each(fn ($userId) => User::find($userId)?->ban());
                    })
                    ->deselectRecordsAfterCompletion()
                    ->successNotificationTitle('Users banned'),
            ]);
    }

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\Textarea::make('text')
                    ->label('Content')
                    ->required()
                    ->rows(3),
                Forms\Components\Toggle::make('approved')
                    ->label('Approved'),
                Forms\Components\Toggle::make('is_spam')
                    ->label('Spam'),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            ActivityLogsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListComments::route('/'),
            'view' => Pages\ViewComment::route('/{record}'),
            'edit' => Pages\EditComment::route('/{record}/edit'),
        ];
    }
}
