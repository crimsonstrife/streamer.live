<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use RuntimeException;

/**
 * Class BaseModel
 *
 * This abstract class extends the Eloquent Model and provides additional functionality
 * for handling soft deletes and timestamp management.
 *
 * @package App\Models
 */
abstract class BaseModel extends Model
{
    /**
     * The name of the "deleted at" column.
     */
    public const DELETED_AT = 'deleted_at';

    private string $updated_at;
    private string $created_at;

    /**
     * BaseModel constructor.
     *
     * @param array $attributes The attributes to initialize the model with.
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->updated_at = $this->getUpdatedAtColumn();
        $this->created_at = $this->getCreatedAtColumn();

        if ($this->forceDeleting) {
            $this->forceDeleting = !config('app.soft_deletes');
        }
    }

    /**
     * Get the table name for the model.
     *
     * @return string The table name.
     */
    public static function getTableName(): string
    {
        return with(new static())->getTable();
    }

    /**
     * Check if the current model has been updated since the given model.
     *
     * @param Model $model The model to compare with.
     * @return bool True if the current model has been updated since the given model, false otherwise.
     */
    public function updatedSince(Model $model): bool
    {
        return $this->updated_at > $model->updated_at;
    }

    /**
     * Check if the model has been updated since it was created.
     *
     * @return bool True if the model has been updated since it was created, false otherwise.
     */
    public function hasBeenUpdated(): bool
    {
        return $this->updated_at > $this->created_at;
    }

    /**
     * Save the model without updating the timestamps.
     */
    public function saveWithoutTouch(): void
    {
        $this->withoutTouch('save');
    }

    /**
     * Update the model without updating the timestamps.
     *
     * @param array $attributes The attributes to update.
     */
    public function updateWithoutTouch(array $attributes): void
    {
        $this->timestamps = false;
        $this->update($attributes);
        $this->timestamps = true;
    }

    /**
     * Delete the model without updating the timestamps.
     * @return void
     */
    public function deleteWithoutTouch(): void
    {
        $this->withoutTouch('delete');
    }

    /**
     * Force delete the model without updating the timestamps.
     * @return void
     */
    public function forceDeleteWithoutTouch(): void
    {
        $this->withoutTouch('forceDelete');
    }

    /**
     * Restore the model without updating the timestamps.
     * @return void
     */
    public function restoreWithoutTouch(): void
    {
        $this->withoutTouch('restore');
    }

    /**
     * Execute a method without updating the timestamps.
     *
     * @param string $method The method to execute.
     * @throws RuntimeException If the method is not callable.
     */
    protected function withoutTouch(string $method): void
    {
        if (!is_callable([$this, $method])) {
            throw new RuntimeException("Method '{$method}' is not callable.");
        }

        $this->timestamps = false;
        $this->{$method}();
        $this->timestamps = true;
    }
}
