@aware(['page'])
<div class="px-4 py-4 md:py-8">
    <div class="mx-auto max-w-7xl">
        <div class="aspect-w-16 aspect-h-9">
            <iframe src="https://embed.twitch.tv/?allowfullscreen=true&channel={{ $channel }}&layout=video&parent={{ request()->getHost() }}" height="600" width="100%" allow="autoplay; fullscreen" scrolling="no" allowfullscreen
                sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow popups-to-escape-sandbox allow-storage-access-by-user-activation" id="stream_embed">
            </iframe>
            @if ($chat)
                <iframe src="https://www.twitch.tv/embed/{{ $channel }}/chat?parent={{ request()->getHost() }}"
                    height="500" width="100%" id="chat_embed">
                </iframe>
            @endif
        </div>
    </div>
</div>
