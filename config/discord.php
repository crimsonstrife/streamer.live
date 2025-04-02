<?php

return [
    'enabled' => env('DISCORD_ENABLED', false),
    'token' => env('DISCORD_BOT_TOKEN'),
    'guild_id' => env('DISCORD_GUILD_ID'),
    'channel_id' => env('DISCORD_CHANNEL_ID'),
    'verify' => env('DISCORD_VERIFY', true),
];
