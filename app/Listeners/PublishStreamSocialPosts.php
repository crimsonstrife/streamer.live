<?php

namespace App\Listeners;

use App\Events\StreamerWentLive;
use App\Models\StreamSocialPostRule;
use App\Services\Factories\SocialPosterFactory;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

class PublishStreamSocialPosts implements ShouldQueue
{
    use InteractsWithQueue;

    public int $tries = 3;
    public array $backoff = [10, 30, 60];

    public function __construct(
        private readonly SocialPosterFactory $factory,
    ) {
    }

    /**
     * @throws Throwable
     */
    public function handle(StreamerWentLive $event): void
    {
        $stream = $event->streamData[0] ?? null;

        // Sanity: only proceed if truly live
        if (! is_array($stream) || strtolower($stream['type'] ?? '') !== 'live') {
            return;
        }

        $streamId  = $stream['id'] ?? null;
        $streamer  = strtolower($event->username);
        $category  = $stream['game_name'] ?? 'Unknown Game';
        $title     = $stream['title'] ?? '';
        $url       = "https://twitch.tv/{$streamer}";
        $startedAt = $stream['started_at'] ?? null;

        if (! $streamId) {
            // stream id is your best dedupe key; if missing, do nothing (or fallback to started_at hash)
            Log::warning("PublishStreamSocialPosts: missing stream id for {$streamer}");
            return;
        }

        $context = [
            'streamer' => $streamer,
            'category' => $category,
            'title' => $title,
            'url' => $url,
            'stream_id' => $streamId,
            'started_at' => $startedAt,
        ];

        $rules = StreamSocialPostRule::query()
            ->where('enabled', true)
            ->where('event', 'live')
            ->with('account')
            ->get();

        foreach ($rules as $rule) {
            $account = $rule->account;

            if (! $account || ! $account->enabled) {
                continue;
            }

            if ($rule->streamer_username && strtolower($rule->streamer_username) !== $streamer) {
                continue;
            }

            if ($rule->category_pattern && @preg_match($rule->category_pattern, $category) !== 1) {
                continue;
            }

            // Dedupe per rule per stream
            $dedupeKey = "socialpost.sent.rule.{$rule->id}.stream.{$streamId}";
            if (! Cache::add($dedupeKey, true, now()->addHours(12))) {
                continue;
            }

            $text = $this->renderTemplate(
                $rule->message_template ?: StreamSocialPostRule::defaultMessageTemplate(),
                $context
            );

            try {
                $poster = $this->factory->make($account->platform);
                $result = $poster->post($account, $text, $context);

                Log::channel('twitch')->info("Social post sent via {$account->platform->value} (rule {$rule->id})", [
                    'streamer' => $streamer,
                    'stream_id' => $streamId,
                    'external_id' => $result->externalId,
                ]);
            } catch (Throwable $e) {
                // Release the dedupe key so a retry can happen (or keep it set to avoid repeated failures; your call)
                Cache::forget($dedupeKey);

                Log::error("Social post failed via {$account->platform->value} (rule {$rule->id}): {$e->getMessage()}", [
                    'streamer' => $streamer,
                    'stream_id' => $streamId,
                ]);

                // Let queue retry handle transient errors
                throw $e;
            }
        }
    }

    private function renderTemplate(string $template, array $context): string
    {
        return str_replace(
            ['{streamer}', '{category}', '{title}', '{url}', '{stream_id}', '{started_at}'],
            [$context['streamer'], $context['category'], $context['title'], $context['url'], $context['stream_id'], (string)($context['started_at'] ?? '')],
            $template
        );
    }
}
