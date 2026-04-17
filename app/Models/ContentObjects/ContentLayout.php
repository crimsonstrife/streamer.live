<?php

namespace App\Models\ContentObjects;

use App\Models\BaseModel;
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentLayout extends BaseModel
{
    use HasSlug;

    protected $table = 'content_layouts';

    protected $fillable = [
        'content_type_id',
        'name',
        'slug',
        'type',
        'blade_view',
        'is_default',
        'settings',
    ];

    protected $casts = [
        'content_type_id' => 'integer',
        'is_default' => 'boolean',
        'settings' => 'array',
    ];

    protected function slugSourceColumn(): string
    {
        return 'name';
    }

    public function contentType(): BelongsTo
    {
        return $this->belongsTo(ContentType::class);
    }

    /**
     * Get the full Blade view path for rendering.
     */
    public function getView(): string
    {
        return $this->blade_view;
    }

    public function scopeForType(Builder $query, ContentType|int $contentType): Builder
    {
        $id = $contentType instanceof ContentType ? $contentType->id : $contentType;

        return $query->where('content_type_id', $id);
    }

    public function scopeOfKind(Builder $query, string $kind): Builder
    {
        return $query->where('type', $kind);
    }

    public function scopeDefault(Builder $query): Builder
    {
        return $query->where('is_default', true);
    }
}
