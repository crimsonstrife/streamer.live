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
            'text' => ['name' => self::generateUniqueName('Text Block'), 'display_name' => 'Text Block', 'type' => 'text', 'content' => ['text' => '']],
            'image' => ['name' => self::generateUniqueName('Image Block'), 'display_name' => 'Image Block', 'type' => 'image', 'content' => ['url' => '']],
            'embed' => ['name' => self::generateUniqueName('Embed Block'), 'display_name' => 'Embed Block', 'type' => 'embed', 'content' => ['embed_url' => '']],
            'latest_posts' => ['name' => self::generateUniqueName('Latest Posts Block'), 'display_name' => 'Latest Posts', 'type' => 'latest_posts', 'content' => ['limit' => 5], /* Default: Show 5 posts */],
            'twitch' => ['name' => self::generateUniqueName('Twitch Embed'), 'display_name' => 'Twitch Block', 'type' => 'twitch', 'content' => ['channel' => '', 'chat' => false]],
            'wysiwyg' => ['name' => self::generateUniqueName('WYSIWYG Block'), 'display_name' => 'HTML Block', 'type' => 'wysiwyg', 'content' => ['text' => '']],
        ];
    }

    private static function generateUniqueName(string $name): string
    {
        // Generate a unique block name making the name html safe, and appending a timestamp
        return Str::slug($name) . '-' . now()->timestamp;
    }
}
