<?php

namespace App\Models;

use App\Traits\IsPermissible;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StreamAlertRule extends BaseModel
{
    use HasFactory;
    use IsPermissible;

    protected $fillable = [
        'category_pattern',
        'message_template',
        'discord_channel_id',
        'discord_roles',
        'enabled',
    ];

    protected $casts = [
        'discord_roles' => 'array',
        'enabled' => 'boolean',
    ];

    /**
     * Returns the default message with placeholders.
     */
    public static function defaultMessageTemplate(): string
    {
        return '{streamer} is live in {category}! Watch here: {url}';
    }

    /**
     * Helper to extract role mentions for Discord message.
     */
    public function getRoleMentions(): string
    {
        return collect($this->discord_roles)->map(fn ($role) => "<@&{$role['id']}>")->join(' ');
    }
}
