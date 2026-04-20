<?php

namespace App\Models\ContentObjects;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentField extends BaseModel
{
    protected $table = 'content_fields';

    protected $fillable = [
        'content_type_id',
        'name',
        'label',
        'type',
        'is_required',
        'is_searchable',
        'show_in_table',
        'options',
        'validation_rules',
        'default_value',
        'sort_order',
        'column_span',
    ];

    protected $casts = [
        'content_type_id' => 'integer',
        'is_required' => 'boolean',
        'is_searchable' => 'boolean',
        'show_in_table' => 'boolean',
        'options' => 'array',
        'sort_order' => 'integer',
        'column_span' => 'integer',
    ];

    public function contentType(): BelongsTo
    {
        return $this->belongsTo(ContentType::class);
    }

    /**
     * Get a specific option value with a default fallback.
     */
    public function getOption(string $key, mixed $default = null): mixed
    {
        return data_get($this->options, $key, $default);
    }
}
