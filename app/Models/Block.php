<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Block extends Model
{
    protected $fillable = ['name', 'type', 'content'];

    protected $casts = [
        'content' => 'array',
    ];

    public function pages(): BelongsToMany
    {
        return $this->belongsToMany(Page::class, 'page_block')->withPivot('order')->orderBy('page_block.order');
    }

    public static function nativeBlocks()
    {
        return [
            'text' => ['name' => 'Text Block', 'type' => 'text', 'content' => ['text' => '']],
            'image' => ['name' => 'Image Block', 'type' => 'image', 'content' => ['url' => '']],
            'embed' => ['name' => 'Embed Block', 'type' => 'embed', 'content' => ['embed_url' => '']],
            'latest_posts' => ['name' => 'Latest Posts', 'type' => 'latest_posts', 'content' => []],
        ];
    }
}
