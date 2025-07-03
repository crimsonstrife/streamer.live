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
            <x-fas-thumbs-up height="1rem" width="auto"/>
        </button>
    </form>
    <span
        class="me-3 small">({{ $comment->countReactions('like') - $comment->countReactions('dislike') }})</span>
    <form method="POST"
          action="{{ route('blog.comment.reaction.toggle', ['type' => 'dislike', 'comment' => $comment->id]) }}">
        @csrf
        <button class="btn btn-default btn-xs icon-btn me-4">
            <x-fas-thumbs-down height="1rem" />
        </button>
    </form>
@endauth
