<x-app-layout>
    <x-slot name="header"><h2>{{ $event->title }}</h2></x-slot>
    <div class="container py-5">
        <p><strong>When:</strong> {{ $event->starts_at->format('M j, g:ia') }}</p>
        <p><strong>Until:</strong> {{ $event->ends_at->format('M j, g:ia') }}</p>
        <a href="{{ route('events.index') }}" class="btn btn-link">Back to all events</a>
    </div>
</x-app-layout>
