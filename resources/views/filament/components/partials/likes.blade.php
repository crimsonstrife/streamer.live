@props(['comment', 'post'])
@php
    $isManualSpam = $comment->is_spam;
    $isAutoSpam   = ! $isManualSpam && $comment->is_spam_auto;
    $highSpamRisk = $comment->spam_score > 4;
    $commentByID = $comment->commentedBy->id;
    $postAuthorID = $post->author->user_id;
    $commentByAuthor = $commentByID === $postAuthorID;
@endphp
@auth
    <form method="POST"
          action="{{ route('blog.comment.reaction.toggle', ['type' => 'like', 'comment' => $comment->id]) }}">
        @csrf
        <button class="btn btn-default btn-xs icon-btn me-1">
            <svg class="svg-icon material-symbols-filled material-symbols-thumb_up" width="20" height="20">
                <use xlink:href="#google-thumb_up-fill"></use>
            </svg>
        </button>
    </form>
    <span
        class="me-3 small">({{ $comment->countReactions('like') - $comment->countReactions('dislike') }})</span>
    <form method="POST"
          action="{{ route('blog.comment.reaction.toggle', ['type' => 'dislike', 'comment' => $comment->id]) }}">
        @csrf
        <button class="btn btn-default btn-xs icon-btn me-4">
            <svg class="svg-icon material-symbols-outlined material-symbols-thumb_down" width="20"
                 height="20">
                <use xlink:href="#google-thumb_down"></use>
            </svg>
        </button>
    </form>
@endauth
