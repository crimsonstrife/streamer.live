<?php

namespace App\Models\SponsorObjects;

use App\Casts\MoneyValueCast;
use App\Models\AuthObjects\User;
use App\Models\BaseModel;
use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends BaseModel
{
    use IsPermissible;

    protected $table = 'donations';

    protected $fillable = [
        'goal_id',
        'user_id',
        'stripe_checkout_session_id',
        'stripe_payment_intent_id',
        'stripe_charge_id',
        'amount',
        'currency',
        'donor_name',
        'donor_email',
        'is_anonymous',
        'message',
        'is_message_approved',
        'status',
        'paid_at',
    ];

    protected $casts = [
        'amount' => MoneyValueCast::class,
        'is_anonymous' => 'bool',
        'is_message_approved' => 'bool',
        'paid_at' => 'datetime',
    ];

    public function goal(): BelongsTo
    {
        return $this->belongsTo(Goal::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeSucceeded(Builder $query): Builder
    {
        return $query->where('status', 'succeeded');
    }

    public function scopeForGoal(Builder $query, Goal $goal): Builder
    {
        return $query->where('goal_id', $goal->id);
    }

    public function scopeWithApprovedMessage(Builder $query): Builder
    {
        return $query->whereNotNull('message')->where('is_message_approved', true);
    }

    public function displayName(): string
    {
        if ($this->is_anonymous) {
            return 'Anonymous';
        }

        return $this->donor_name ?? 'Supporter';
    }
}
