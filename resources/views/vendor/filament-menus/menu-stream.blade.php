{{-- Compact dark nav rendering for the "live-stream" layout. --}}
@php
    $items = $menuItems->sortBy('order');
    $locale = app()->getLocale();
@endphp
<ul class="stream-nav-list">
    @foreach ($items as $item)
        @php
            $link = ! empty($item['route']) ? route($item['route']) : ($item['url'] ?? '#');
            $title = is_array($item['title'] ?? null)
                ? ($item['title'][$locale] ?? reset($item['title']))
                : ($item['title'] ?? '');
            $isActive = url()->current() === $link;
        @endphp
        <li>
            <a href="{{ $link }}"
               class="stream-nav-link {{ $isActive ? 'is-active' : '' }}"
               @if (! empty($item['new_tab'])) target="_blank" rel="noopener" @endif>
                {{ $title }}
            </a>
        </li>
    @endforeach
</ul>
