<?php

namespace App\Filament\Clusters\Integrations\Pages;

use App\Filament\Clusters\Integrations;
use Carbon\Carbon;
use Filament\Actions\Action;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\HtmlString;

class TwitchSettings extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = \App\Settings\TwitchSettings::class;

    protected static ?string $cluster = Integrations::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Twitch Integration Settings')
                    ->description('Configure Twitch API integration for your application.')
                    ->schema([
                        Placeholder::make('connection_status')
                            ->label('Twitch OAuth Status')
                            ->dehydrated(false)
                            ->content(function (): HtmlString {
                                $rows = DB::table('settings')
                                    ->where('group', 'twitch')
                                    ->get(['name','payload']);

                                if ($rows->isEmpty()) {
                                    return new HtmlString('❌ <strong>Not connected</strong>');
                                }

                                $settings = $rows
                                    ->pluck('payload', 'name')
                                    ->map(fn ($p) => json_decode($p, true))
                                    ->toArray();

                                $token   = $settings['user_access_token']   ?? null;
                                $expires = isset($settings['user_token_expires'])
                                    ? Carbon::parse($settings['user_token_expires'])
                                    : null;

                                if ($token) {
                                    // Connected and not expired
                                    if ($expires && now()->lt($expires)) {
                                        $iso   = $expires->toIso8601String();
                                        $label = $expires->toDateTimeString();

                                        $html  = '✅ <strong>Connected</strong><br>'
                                            . 'Expires at: <time class="twitch-expiry" datetime="' . $iso . '">'
                                            . $label
                                            . '</time>';
                                    }
                                    // Expired or no expiry
                                    else {
                                        $iso   = $expires
                                            ? $expires->toIso8601String()
                                            : now()->toIso8601String();
                                        $label = $expires
                                            ? $expires->toDateTimeString()
                                            : 'unknown';

                                        $html  = '⚠️ <strong>Token expired</strong><br>'
                                            . 'Expired at: <time class="twitch-expiry" datetime="' . $iso . '">'
                                            . $label
                                            . '</time>';
                                    }

                                    // append the JS to localize
                                    $html .= '<script>
                document.addEventListener("DOMContentLoaded", function() {
                    document.querySelectorAll("time.twitch-expiry").forEach(function(el) {
                        var dt = new Date(el.getAttribute("datetime"));
                        el.textContent = dt.toLocaleString();
                    });
                });
            </script>';

                                    return new HtmlString($html);
                                }

                                return new HtmlString('❌ <strong>Not connected</strong>');
                            }),


                        Toggle::make('enable_integration')
                            ->label('Enable Twitch Integration')
                            ->default(false),

                        TextInput::make('channel_name')
                            ->label('Twitch Channel Name')
                            ->placeholder('e.g. Twitch Username')
                            ->maxLength(100),

                        TextInput::make('client_id')
                            ->label('Client ID')
                            ->password()
                            ->revealable()
                            ->maxLength(255),

                        TextInput::make('client_secret')
                            ->label('Client Secret')
                            ->password()
                            ->revealable()
                            ->maxLength(255),

                        Toggle::make('ssl_verify')
                            ->label('Verify SSL Certificates')
                            ->default(true),
                    ])
                    ->columns(2),
            ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('connectStreamer')
                ->label('Connect Streamer Twitch Account')
                ->url(route('twitch.oauth.redirect', ['context' => 'admin']))
                ->color('secondary'),
        ];
    }
}
