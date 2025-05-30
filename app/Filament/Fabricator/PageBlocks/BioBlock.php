<?php

namespace App\Filament\Fabricator\PageBlocks;

use App\Services\TwitchService;
use Carbon\Carbon;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Builder\Block;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Z3d0X\FilamentFabricator\PageBlocks\PageBlock;

class BioBlock extends PageBlock
{
    public static function getBlockSchema(): Block
    {
        return Block::make('about-bio')
            ->schema([
                FileUpload::make('portrait_image')
                    ->label('Portrait Image')
                    ->image()
                    ->directory('bios'),

                RichEditor::make('bio')
                    ->label('Bio')
                    ->required(),

                TextInput::make('read_more_url')
                    ->label('Read More Link')
                    ->url()
                    ->nullable(),
            ]);
    }

    /**
     * @throws ConnectionException
     * @throws RequestException
     */
    public static function mutateData(array $data): array
    {
        // Ensure fields
        $data['portrait_image'] = $data['portrait_image'] ?? null;
        $data['bio']            = $data['bio']            ?? '';
        $data['read_more_url']  = $data['read_more_url']  ?? null;

        // Fetch stats from Twitch
        $twitch    = app(TwitchService::class);
        $profile   = $twitch->getUserProfile();
        $followers = $twitch->getFollowerCount();
        $subscribers = $twitch->getSubscriberCount();
        $views = $twitch->getTotalVideoViews();

        $createdAt = isset($profile['created_at'])
            ? Carbon::parse($profile['created_at'])
            : now();

        $data['stats'] = [
            'years_streaming' => round($createdAt->diffInYears(now())),
            'followers'       => $followers,
            'subscribers'     => $subscribers,
            'total_views'     => $views ?? 0,
        ];

        return $data;
    }
}
