@php
    /** @var \App\Settings\SocialSettings $settings */
    $settings = app(\App\Settings\SocialSettings::class);

    // allow caller to override, otherwise default to 5
    $limit = $limit ?? 5;

    // determine the order (saved or fallback)
    $order = $settings->social_display_order;
    if (empty($order)) {
        $order = collect([
            'twitter','facebook','instagram','linkedin','youtube',
            'twitch','tiktok','bluesky','kick','threads',
            'github','gitlab','discord','reddit','mastodon',
            'pinterest','snapchat','tumblr','medium','dribbble',
            'behance','stackoverflow','patreon','kofi','soundcloud','spotify',
        ])
        ->filter(fn($key) => filled($settings->{"social_{$key}_" . ($key === 'discord' ? 'invite' : 'handle')}))
        ->toArray();
    }

    // only show up to the requested number
    $order = collect($order)->take($limit)->toArray();
@endphp

<ul class="list-unstyled d-flex">
    @foreach($order as $key)
        @php
            $prop   = "social_{$key}_" . ($key === 'discord' ? 'invite' : 'handle');
            $handle = $settings->{$prop} ?? null;
            $url    = \App\Utilities\SocialUrlGenerator::url($key, $handle);
            $key    = ($key === 'twitter' ? 'x-twitter' : $key);
        @endphp

        @if($url)
            <li class="ms-4">
                <a class="link-body-emphasis" href="{{ $url }}" target="_blank" rel="noopener">
                    <x-dynamic-component :component="'fab-'.$key" width="25" height="25" />
                </a>
            </li>
        @endif
    @endforeach
</ul>
