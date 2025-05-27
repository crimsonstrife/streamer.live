<?php

namespace App\Models;

use App\Models\BaseModel as Model;
use Eloquent;
use Guava\Calendar\Contracts\Eventable;
use Guava\Calendar\ValueObjects\CalendarEvent;
use Guava\Calendar\ValueObjects\Event as EventModel;
use Illuminate\Support\Carbon;

/**
 *
 *
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Event whereUpdatedAt($value)
 * @mixin Eloquent
 */
class Event extends Model implements Eventable
{
    protected $fillable = [
        'title',
        'starts_at',
        'ends_at',
        'twitch_segment_id',
        'all_day'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at'   => 'datetime',
        'all_day'   => 'boolean',
    ];

    public function toEvent(): EventModel|array
    {
        return EventModel::make($this)
            ->title($this->title)
            ->start($this->starts_at)
            ->end($this->ends_at);
    }

    public function toCalendarEvent(): array|CalendarEvent
    {
        // This already maps into an EventModel, which also satisfies CalendarEvent
        return $this->toEvent();
    }
}
