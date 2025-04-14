<div class="comment border p-3 mb-3 rounded">
    <strong>{{ $comment->commentedBy->name ?? 'Anonymous' }}</strong>
    <small class="text-muted float-end">{{ $comment->created_at->diffForHumans() }}</small>
    <p class="mt-2">{{ $comment->text }}</p>

    <a href="#" class="reply-link" data-reply-id="{{ $comment->id }}">Reply</a>

    @if ($comment->replies->isNotEmpty())
        <div class="replies ms-4 mt-3 border-start ps-3">
            @foreach ($comment->replies as $reply)
                @include('components.comment-thread', ['comment' => $reply])
            @endforeach
        </div>
    @endif
</div>

