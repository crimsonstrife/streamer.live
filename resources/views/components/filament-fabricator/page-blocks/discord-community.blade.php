@aware(['page'])

@php
    $title       = $title        ?? 'Join Our Discord';
    $invite      = $liveInvite   ?? ($data['invite_url'] ?? '#');
    $members     = $memberCount  ?? null;
    $online      = $presenceCount ?? null;
    $widget = (bool) ($embedWidget ?? false);
    $guildId     = $guildId      ?? null;
    $themeSettings = app(\App\Settings\LookFeelSettings::class)
@endphp

<div class="discord-community-block text-center">
    <h2>{{ $title }}</h2>

    @if($widget && $guildId)
        <iframe
            src="https://discord.com/widget?id={{ $guildId }}&theme={{ $themeSettings->mode !== 'auto' ? $themeSettings->mode : 'dark' }}"
            width="100%" height="350"
            allowtransparency="true"
            border="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
    @endif

    <p class="mt-3">
        <a href="{{ $invite }}" target="_blank" class="btn btn-primary">
            Join the Discord
        </a>
    </p>

    @if($members !== null || $online !== null)
        <p class="text-muted mt-2">
            @if($members !== null)
                {{ number_format($members) }} members
                @endif
                @if($online !== null)
                    &bull; {{ number_format($online) }} online
            @endif
        </p>
    @endif
</div>
