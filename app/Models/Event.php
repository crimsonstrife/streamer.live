<?php

namespace App\Models;

use App\Models\BaseModel as Model;
use Guava\Calendar\Contracts\Eventable;
use Guava\Calendar\ValueObjects\Event as EventModel;

class Event extends Model implements Eventable
{
    public function toEvent(): EventModel|array
    {
        return EventModel::make($this)
            ->title($this->name)
            ->start($this->starts_at)
            ->end($this->ends_at);
    }
}
