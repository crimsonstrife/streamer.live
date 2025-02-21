@if ($isEditing)
    <div class="p-4 bg-white border rounded shadow">
        <h4 class="mb-2">Twitch Stream</h4>

        <label for="channel-{{ $index }}">Channel Name:</label>
        <input type="text" wire:model="blocks.{{ $index }}.content.channel" id="channel-{{ $index }}"
            class="mb-2 form-control" placeholder="Enter Twitch channel name">

        <label for="chat-toggle-{{ $index }}">Show Chat?</label>
        <input type="checkbox" wire:model="blocks.{{ $index }}.content.chat"
            id="chat-toggle-{{ $index }}" class="mb-2 form-check-input">
    </div>
@else
<div class="p-3 border rounded twitch-block">
    <h4 class="mb-2">Live Stream</h4>
    @if (!empty($block['content']['channel']))
        <div class="mt-3">
            <iframe
                src="https://embed.twitch.tv/?allowfullscreen=true&channel={{ $block['content']['channel'] }}&layout=video&parent={{ request()->getHost() }}"
                height="400" width="100%" allow="autoplay; fullscreen" scrolling="no" allowfullscreen sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow popups-to-escape-sandbox allow-storage-access-by-user-activation">
            </iframe>

            @if ($block['content']['chat'])
                <iframe
                    src="https://www.twitch.tv/embed/{{ $block['content']['channel'] }}/chat?parent={{ request()->getHost() }}"
                    height="300" width="100%" id="chat_embed">
                </iframe>
            @endif
        </div>
    @endif
</div>
@endif
