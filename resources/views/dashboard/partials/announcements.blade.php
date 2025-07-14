@php
    $blogSlug = \App\Utilities\BlogHelper::getBlogSlug();
            // Fetch up to 5 recent announcements
            $announcements = \App\Models\BlogObjects\Post::where('is_announcement', true)
                ->whereNotNull('published_at')
                ->orderBy('published_at', 'desc')
                ->limit(5)
                ->get()
                ->map(fn($post) => (object)[
                    'type'      => 'announcement',
                    'title'     => $post->title,
                    'url'       => route($blogSlug.'.post', ['slug' => $post->slug]),
                    'date'      => $post->published_at,
                ]);

            // Fetch up to 5 upcoming events
            $events = \App\Models\Event::where('starts_at', '>=', now())
                ->orderBy('starts_at')
                ->limit(5)
                ->get()
                ->map(fn($event) => (object)[
                    'type'      => 'event',
                    'title'     => $event->title,
                    'url'       => route('events.show', $event),
                    'date'      => $event->starts_at,
                ]);

            // Merge, sort by date (soonest/upcoming first, then latest announcements), and take top 5
            $feed = $events
                ->merge($announcements)
                ->sortBy('date')
                ->take(5);
@endphp
<div class="card shadow-lg rounded mb-4">
    <div class="card-body">
        <h5 class="mb-3">What’s New</h5>

        @forelse($feed as $item)
            <div class="d-flex align-items-start py-2 border-bottom">
                {{-- Icon or badge by type --}}
                @if($item->type === 'event')
                    <i class="bi bi-calendar-event fs-5 text-primary me-2"></i>
                @else
                    <i class="bi bi-megaphone fs-5 text-secondary me-2"></i>
                @endif

                <div class="flex-grow-1">
                    <a href="{{ $item->url }}" class="fw-semibold">{{ $item->title }}</a>
                    <small class="d-block text-muted">
                        {{ $item->date->format(
                           $item->type === 'event'
                             ? 'M j, g:ia'
                             : 'M j, Y'
                        ) }}
                    </small>
                </div>
            </div>
        @empty
            <p class="text-muted small mb-0">No upcoming items or announcements.</p>
        @endforelse
    </div>
</div>
