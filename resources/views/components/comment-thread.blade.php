<div class="comment border p-3 mb-3 rounded">
    <strong>{{ $comment->commentedBy->name ?? 'Anonymous' }}</strong>
    <small class="text-muted float-end">{{ $comment->created_at->diffForHumans() }}</small>
    <p class="mt-2">{{ $comment->text }}</p>

    <a href="#" class="reply-link" data-reply-id="{{ $comment->id }}">Reply</a>

    <div class="mt-2">
        <form method="POST"
              action="{{ route('blog.comment.reaction.toggle', ['post' => $post, 'type' => 'like', 'comment' => $comment->id]) }}">
            @csrf
            <button class="btn btn-sm btn-outline-success" type="submit">
                👍 ({{ $comment->countReactions('like') }})
            </button>
            <button class="btn btn-sm btn-outline-danger" type="submit"
                    formaction="{{ route('blog.comment.reaction.toggle', ['post' => $post,'type' => 'dislike', 'comment' => $comment->id]) }}">
                👎 ({{ $comment->countReactions('dislike') }})
            </button>
        </form>
    </div>

    @php
        $summary = $comment->getReactionSummary();
    @endphp

    @foreach ($summary as $type => $count)
        <span class="badge bg-secondary">{{ ucfirst($type) }}: {{ $count }}</span>
    @endforeach


    @if ($comment->replies->isNotEmpty())
        <div class="replies ms-4 mt-3 border-start ps-3">
            @foreach ($comment->replies as $reply)
                @include('components.comment-thread', ['comment' => $reply])
            @endforeach
        </div>
    @endif
</div>

