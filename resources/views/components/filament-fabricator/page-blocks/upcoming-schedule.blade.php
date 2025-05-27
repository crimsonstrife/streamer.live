@aware(['page'])
<div class="upcoming-schedule-block">
    <h2>{{ $title }}</h2>
    <ul class="list-unstyled">
        @foreach($events as $event)
            <li class="mb-2">
                @if(!empty($event['url']))
                    <a href="{{ $event['url'] }}" target="_blank">{{ $event['title'] }}</a>
                @else
                    {{ $event['title'] }}
                @endif
                —
                <time class="event-time" datetime="{{ $event['iso'] }}">
                    {{ $event['time'] }}
                </time>
            </li>
        @endforeach
    </ul>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('time.event-time').forEach(el => {
            const iso = el.getAttribute('datetime');
            if (!iso) return;
            el.textContent = new Date(iso).toLocaleString();
        });
    });
</script>
