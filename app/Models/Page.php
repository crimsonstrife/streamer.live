<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use RalphJSmit\Laravel\SEO\Support\HasSEO;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Page extends Model implements HasMedia
{
    use HasSEO;
    use SoftDeletes;
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'slug',
        'status',
        'is_protected',
        'password',
        'published_at',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
        'is_protected' => 'boolean',
    ];

    protected $hidden = [
        'password',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'page_tags');
    }

    public function blocks(): BelongsToMany
    {
        return $this->belongsToMany(Block::class)->withPivot('order')->orderBy('order');
    }
}
