<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Block extends Model
{
    protected $fillable = ['name', 'display_name', 'type', 'content'];

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
            'text' => ['name' => generateUniqueName('Text Block'), 'display_name' => 'Text Block', 'type' => 'text', 'content' => ['text' => '']],
            'image' => ['name' => generateUniqueName('Image Block'), 'display_name' => 'Image Block', 'type' => 'image', 'content' => ['url' => '']],
            'embed' => ['name' => generateUniqueName('Embed Block'), 'display_name' => 'Embed Block', 'type' => 'embed', 'content' => ['embed_url' => '']],
            'latest_posts' => ['name' => generateUniqueName('Latest Posts Block'), 'display_name' => 'Latest Posts', 'type' => 'latest_posts', 'content' => []],
        ];
    }

    private static function generateUniqueName(string $name): string
    {
        // Generate a unique block name making the name html safe, and appending a timestamp
        return Str::slug($name) . '-' . now()->timestamp;
    }
}
