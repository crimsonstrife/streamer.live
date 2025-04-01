<?php

namespace App\Console\Commands;

use App\Services\DiscordBotService;
use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;

class TestDiscordMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'discord:test {message?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a test message to the configured Discord channel';

    /**
     * Execute the console command.
     *
     * @throws ConnectionException
     */
    public function handle(DiscordBotService $discord): void
    {
        $message = $this->argument('message') ?? '🚨 Test message from Laravel bot.';

        $this->info("Sending: $message");

        $discord->sendMessage(config('discord.channel_id'), $message);

        $this->info('Message sent (if Discord config is valid).');
    }
}
