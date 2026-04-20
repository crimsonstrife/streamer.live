<?php

namespace App\Models\ContentObjects;

use App\Models\AuthObjects\User;
use App\Models\BaseModel;
use App\Traits\HasSlug;
use App\Traits\IsPermissible;
use Indra\Revisor\Concerns\HasRevisor;
use Indra\Revisor\Contracts\HasRevisor as HasRevisorContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Tags\HasTags;

class ContentEntry extends BaseModel implements HasRevisorContract
{
    use HasRevisor;
    use HasSlug;
    use HasTags;
    use IsPermissible;

    protected $table = 'content_entries';

    protected $fillable = [
        'content_type_id',
        'title',
        'slug',
        'data',
        'sort_order',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'content_type_id' => 'integer',
        'data' => 'array',
        'sort_order' => 'integer',
        'created_by' => 'integer',
        'updated_by' => 'integer',
    ];

    protected function slugSourceColumn(): string
    {
        return 'title';
    }

    public function contentType(): BelongsTo
    {
        return $this->belongsTo(ContentType::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get a field value from the data JSON.
     */
    public function getFieldValue(string $fieldName, mixed $default = null): mixed
    {
        return data_get($this->data, $fieldName, $default);
    }

    /**
     * Set a field value in the data JSON.
     */
    public function setFieldValue(string $fieldName, mixed $value): void
    {
        $data = $this->data ?? [];
        data_set($data, $fieldName, $value);
        $this->data = $data;
    }

    public function scopeOfType(Builder $query, ContentType|int $contentType): Builder
    {
        $id = $contentType instanceof ContentType ? $contentType->id : $contentType;

        return $query->where('content_type_id', $id);
    }

    public function getBaseTable(): string
    {
        return 'content_entries';
    }

    /**
     * Override for Livewire hydration: resolve from drafts table
     * so that unpublished records can be found during admin editing.
     */
    public function newQueryForRestoration($ids): Builder
    {
        return $this->newQueryWithoutScopes()->withDraftContext()->whereKey($ids);
    }

    public static function boot(): void
    {
        parent::boot();

        static::creating(static function (ContentEntry $model) {
            if (auth()->check()) {
                $model->created_by = $model->created_by ?? auth()->id();
                $model->updated_by = auth()->id();
            }
        });

        static::updating(static function (ContentEntry $model) {
            if (auth()->check()) {
                $model->updated_by = auth()->id();
            }
        });
    }
}
