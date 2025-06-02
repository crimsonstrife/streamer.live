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
        // Get the reusable service
        /** @var DiscordBotService $discord */
        $discord   = app(DiscordBotService::class);
        $guildId   = $discord->getGuildId();
        $widget    = $discord->getGuildWidget() ?? [];

        // Compute outputs (falling back to form inputs or nulls)
        $liveInvite    = $widget['instant_invite']      ?? ($data['invite_url'] ?? null);
        $memberCount   = isset($widget['members']) ? count($widget['members']) : null;
        $presenceCount = $widget['presence_count']      ?? null;
        $embedWidget   = (bool) ($data['embed_widget'] ?? false);

        // Merge into the data array
        return array_merge($data, [
            'live_invite'    => $liveInvite,
            'member_count'   => $memberCount,
            'presence_count' => $presenceCount,
            'embed_widget'   => $embedWidget,
            'guild_id'       => $guildId,
        ]);
    }
}
