<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Services\DiscordBotService;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Illuminate\Support\Facades\Log;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class DiscordCommunityBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('discord-community')
            ->schema([
                TextInput::make('title')
                    ->label('Heading')
                    ->default('Join Our Discord'),

                TextInput::make('invite_url')
                    ->label('Fallback Invite URL')
                    ->url()
                    ->required()
                    ->helperText('Used if widget is disabled on your server.'),

                Toggle::make('embed_widget')
                    ->label('Embed Discord Widget')
                    ->helperText('Shows the official Discord widget iframe if enabled on your server.')
                    ->default(true),
            ]);
    }

    public static function mutateData(array $data): array
    {
        /** @var DiscordBotService $discord */
        $discord = app(DiscordBotService::class);

        $guildId = $discord->getGuildId();
        $widget = $discord->getGuildWidget() ?? [];
        $counts = $discord->getGuildCounts() ?? [];

        $liveInvite = $widget['instant_invite'] ?? ($data['invite_url'] ?? null);
        $memberCount = $counts['member_count'] ?? null;
        $presenceCount = $counts['presence_count'] ?? ($widget['presence_count'] ?? null);
        $embedWidget = (bool) ($data['embed_widget'] ?? false);

        return array_merge($data, [
            'live_invite'    => $liveInvite,
            'member_count'   => $memberCount,
            'presence_count' => $presenceCount,
            'embed_widget'   => $embedWidget,
            'guild_id'       => $guildId,
        ]);
    }
}
