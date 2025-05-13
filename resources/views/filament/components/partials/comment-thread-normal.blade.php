@props(['comment'])

<x-filament::card class="space-y-4">
    {{-- The parent comment --}}
    <div class="border-b pb-4">
        <div class="text-sm text-gray-500">
            <strong>{{ $comment->commentedBy->name ?? '—' }}</strong>
            <span>•</span>

            {{-- original post time --}}
            <span>{{ $comment->created_at->diffForHumans() }}</span>

            {{-- show “edited” only if updated_at > created_at --}}
            @if($comment->updated_at->gt($comment->created_at))
                <span class="italic text-gray-400">
                    (edited {{ $comment->updated_at->diffForHumans() }})
                </span>
            @endif
        </div>
        <div class="mt-2">{{ $comment->text }}</div>
    </div>

    {{-- Recursively render replies --}}
    @if($comment->replies->isNotEmpty())
        <ul class="space-y-4 pl-4 border-l">
            @foreach($comment->replies as $reply)
                <li>
                    @include('filament.components.comment-thread', ['comment' => $reply])
                </li>
            @endforeach
        </ul>
    @else
        <p class="text-sm text-gray-500 italic">No replies.</p>
    @endif
</x-filament::card>
