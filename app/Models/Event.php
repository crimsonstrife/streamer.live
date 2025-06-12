<?php

namespace App\Models;

use App\Models\BaseModel as Model;
use App\Traits\IsPermissible;
use DateTime;
use Eloquent;
use Guava\Calendar\Contracts\Eventable;
use Guava\Calendar\ValueObjects\CalendarEvent;
use Guava\Calendar\ValueObjects\CalendarResource;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

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
class Event extends Model implements Arrayable, Eventable
{
    use IsPermissible;

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

    public array $resourceIds = [];

    public array $extendedProps = [];

    public array $styles = [];

    public array $classNames = [];

    public function __construct(?Model $model = null)
    {
        if ($model) {
            $this->key($model->getKey());
            $this->model($model::class);
        }

        parent::__construct();
    }

    public function getStart(): Carbon|DateTime
    {
        $timestamp = $this->getAttribute('starts_at');

        // Convert the timestamp to the user's local timezone
        return $timestamp->setTimezone($this->getUserTimezone());
    }

    public function getEnd(): Carbon|DateTime
    {
        $timestamp = $this->getAttribute('ends_at');

        // Convert the timestamp to the user's local timezone
        return $timestamp->setTimezone($this->getUserTimezone());
    }

    /**
     * Fetch the user's timezone.
     *
     * @return string
     */
    protected function getUserTimezone(): string
    {
        // Replace the logic below with how you determine your user's timezone
        return auth()->user()->timezone ?? config('app.timezone', 'UTC');
    }

    public function allDay(bool $allDay = true): static
    {
        $this->allDay = $allDay;

        return $this;
    }

    public function getAllDay(): bool
    {
        return $this->getAttribute('all_day');
    }

    public function getTitle(): string
    {
        return $this->getAttribute('title');
    }

    public function getTwitchSegmentID(): string
    {
        return $this->getAttribute('twitch_segment_id');
    }

    public function resourceId(int | string | CalendarResource $resource): static
    {
        $this->resourceIds([$resource]);

        return $this;
    }

    public function resourceIds(array $resourceIds): static
    {
        $this->resourceIds = [
            ...$this->resourceIds,
            ...$resourceIds,
        ];

        return $this;
    }

    public function getResourceIds(): array
    {
        return $this->resourceIds;
    }

    public function url(string $url, string $target = '_blank'): static
    {
        $this->extendedProp('url', $url);
        $this->extendedProp('url_target', $target);

        return $this;
    }

    public function key(string $key): static
    {
        $this->extendedProp('key', $key);

        return $this;
    }

    public function model(string $model): static
    {
        $this->extendedProp('model', $model);

        return $this;
    }

    public function action(string $action): static
    {
        $this->extendedProp('action', $action);

        return $this;
    }

    public function extendedProp(string $key, mixed $value): static
    {
        data_set($this->extendedProps, $key, $value);

        return $this;
    }

    public function extendedProps(array $props): static
    {
        $this->extendedProps = [
            ...$this->extendedProps,
            ...$props,
        ];

        return $this;
    }

    public function getExtendedProps(): array
    {
        return $this->extendedProps;
    }

    public static function make(?Model $model = null): static
    {
        return new static($model);
    }

    public function toEvent(): CalendarEvent|array
    {
        return CalendarEvent::make($this)
            ->title($this->getTitle())
            ->start($this->getStart())
            ->end($this->getEnd())
            ->allDay($this->getAllDay());
    }

    public function toArray(): array
    {
        return [
            'title' => $this->getTitle(),
            'start' => $this->getStart(),
            'end' => $this->getEnd(),
            'allDay' => $this->getAllDay(),
            'resourceIds' => $this->getResourceIds(),
            'extendedProps' => $this->getExtendedProps(),
            'twitch_segment_id' => $this->getTwitchSegmentID(),
        ];
    }

    public function toCalendarEvent(): array
    {
        return $this->toArray();
    }
}
