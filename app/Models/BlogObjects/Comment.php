<?php

namespace App\Models\BlogObjects;

use App\Models\SharedObjects\Message;
use App\Traits\HasOwner;
use App\Traits\HasOwnerAvatar;
use App\Traits\HasReactions;
use App\Traits\IsPermissible;
use App\Utilities\ModelResolver;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Comment extends Message
{
    use HasOwner;
    use HasOwnerAvatar;
    use HasReactions;
    use LogsActivity;
    use IsPermissible;

    protected $table = 'comments';

    protected $fillable = [
        'text',
        'commented_on_type',
        'commented_on_id',
        'commented_by_type',
        'commented_by_id',
        'reply_id',
        'approved',
        'is_spam',
        'spam_score',
        'is_spam_auto',
        'replies_locked',
    ];

    protected $casts = [
        'approved' => 'bool',
        'is_spam' => 'bool',
        'is_spam_auto' => 'bool',
        'replies_locked' => 'bool',
    ];

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function replies(): HasMany
    {
        return $this->hasMany(self::class, 'reply_id')->with('replies');
    }

    public function scopeAddScore(Builder $query): Builder
    {
        $reactionTable = (new (ModelResolver::reactionModel()))->getTable();
        $commentsTable = $this->getTable();
        $commentClass = addslashes(self::class);

        $reactionsCount = "(select count(*) from {$reactionTable}
        where reactable_type = '{$commentClass}'
          and reactable_id = {$commentsTable}.id)";

        $dislikesCount = "(select count(*) * 2 from {$reactionTable}
            where reactable_type = '{$commentClass}'
              and reactable_id = {$commentsTable}.id
              and type = 'dislike')";

        $repliesCount = "(select count(*) * 2 from {$commentsTable} as laravel_reserved_0
            where laravel_reserved_0.reply_id = {$commentsTable}.id)";

        $replyReactionsCount = "(select count(*) from {$reactionTable}
            inner join {$commentsTable} as laravel_reserved_1
              on laravel_reserved_1.id = {$reactionTable}.reactable_id
            where {$reactionTable}.reactable_type = '{$commentClass}'
              and laravel_reserved_1.reply_id = {$commentsTable}.id)";

        $replyReactionsDislikeCount = "(select count(*) * 2 from {$reactionTable}
            inner join {$commentsTable} as laravel_reserved_2
              on laravel_reserved_2.id = {$reactionTable}.reactable_id
            where {$reactionTable}.reactable_type = '{$commentClass}'
              and laravel_reserved_2.reply_id = {$commentsTable}.id
              and {$reactionTable}.type = 'dislike')";

        // now explicitly alias the whole expression as “score”
        $fullScoreExpr = "(
        {$reactionsCount}
      + {$repliesCount}
      + {$replyReactionsCount}
      - {$dislikesCount}
      - {$replyReactionsDislikeCount}
    ) as score";

        return $query
            // make sure we still select the base columns
            ->select("{$commentsTable}.*")
            // then add the aliased raw
            ->selectRaw($fullScoreExpr);
    }

    public function content(): string
    {
        return html_entity_decode($this->text);
    }

    public function commentedOn(): MorphTo
    {
        return $this->morphTo();
    }

    public function commentedBy(): MorphTo
    {
        return $this->morphTo();
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'reply_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('comment')
            ->logFillable()
            ->logOnlyDirty()                // only changed fields
            ->dontSubmitEmptyLogs();
    }

    public function lockReplies(): void
    {
        $this->update(['replies_locked' => true]);
    }

    public function unlockReplies(): void
    {
        $this->update(['replies_locked' => false]);
    }
}
