@aware(['page'])
<div class="px-4 py-4 md:py-8">
    <div class="mx-auto max-w-7xl">
        <div class="flex {{ $horizontal_layout ? 'flex-row gap-4' : 'flex-col' }}">
            <div class="{{ $horizontal_layout ? 'w-full md:w-2/3' : 'aspect-w-16 aspect-h-9' }}">
                <iframe
                    src="https://embed.twitch.tv/?allowfullscreen=true&channel={{ $channel }}&layout=video&parent={{ request()->getHost() }}"
                    width="100%" height="{{ $horizontal_layout ? '600' : 'auto' }}"
                    allow="autoplay; fullscreen" scrolling="no" allowfullscreen
                    sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                    id="stream_embed">
                </iframe>
            </div>

            @if ($chat)
                <div class="{{ $horizontal_layout ? 'w-full md:w-1/3' : '' }} mt-4 md:mt-0">
                    <iframe
                        src="https://www.twitch.tv/embed/{{ $channel }}/chat?parent={{ request()->getHost() }}"
                        width="100%" height="{{ $horizontal_layout ? '600' : '500' }}"
                        id="chat_embed">
                    </iframe>
                </div>
            @endif
        </div>
    </div>
</div>
