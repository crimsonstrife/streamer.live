<?php

namespace App\Models;

use App\Contracts\CommentableContract;
use App\Enums\Sort;
use App\Models\AuthObjects\User;
use App\Models\BaseModel as Model;
use App\Models\BlogObjects\Comment;
use App\Traits\HasComments;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Ticket extends Model implements CommentableContract
{
    use HasComments;

    protected $fillable = [
        'user_id', 'order_id', 'assigned_to', 'type', 'subject', 'message', 'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(\App\Models\StoreObjects\Order::class);
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    // All messages (both public & private)

    public function publicMessages(): MorphMany
    {
        return $this->messages()->where('is_public', true);
    }

    // Only user‐visible replies

    public function messages(): MorphMany
    {
        return $this->morphMany(TicketMessage::class, 'commented_on')
            ->orderBy('created_at');
    }

    // Only internal notes

    public function privateNotes(): MorphMany
    {
        return $this->messages()->where('is_public', false);
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function getSortOrder(): Sort
    {
        return Sort::NEWEST();
    }

    public function canReportComment(Comment $comment): bool
    {
        return $this->authCheck();
    }

    public function canReplyToComment(Comment $comment): bool
    {
        return $this->authCheck();
    }

    public function canReactToComment(Comment $comment): bool
    {
        return $this->authCheck();
    }
}
