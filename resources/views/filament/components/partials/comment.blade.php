@props(['comment', 'post'])
@php
    $isManualSpam = $comment->is_spam;
    $isAutoSpam   = ! $isManualSpam && $comment->is_spam_auto;
    $highSpamRisk = $comment->spam_score > 4;
    $commentByID = $comment->commentedBy->id;
    $postAuthorID = $post->author->user_id;
    $commentByAuthor = $commentByID === $postAuthorID;
@endphp
<div class="d-flex comment">
    @if ($isManualSpam)
        {{-- Manually flagged as spam: message contents fully hidden --}}
    @elseif ($isAutoSpam || $highSpamRisk)
        {{-- Auto-spam detection: collapsed by default to hide the message, labelled as potential spam to warn users --}}
        <span class="text-yellow-800 font-semibold">Potential spam comment</span>
        <button @click="spamCommentOpen = ! spamCommentOpen" :aria-expanded="spamCommentOpen" type="button"
                class="btn btn-outline-secondary">
            <span x-text="spamCommentOpen ? '-' : '+'"></span>
        </button>
    @else
        {{-- Render Comment normally, not spam --}}
        <button @click="commentOpen = ! commentOpen" :aria-expanded="commentOpen" type="button"
                class="btn btn-default btn-xs">
            <span x-text="commentOpen ? '-' : '+'"></span>
        </button>
    @endif
    <img class="rounded-circle comment-img" src="{{ $comment->commentedBy->profile_photo_url }}" width="50" height="50">
    <div class="flex-grow-1 ms-3">
        <div class="mb-1">
            <a href="#"
               class="fw-bold link-body-emphasis me-1">{{ $comment->commentedBy->name ?? '—' }}</a> @if($commentByAuthor)
                <i class="zmdi zmdi-check me-1 fw-bold" title="verified"></i>
            @endif <span
                class="text-body-secondary text-nowrap">{{ $comment->created_at->diffForHumans() }}@if($comment->updated_at->gt($comment->created_at))
                    (edited {{ $comment->updated_at->diffForHumans() }})
                @endif</span>
        </div>
        <div x-show="@if($isAutoSpam || $highSpamRisk) spamCommentOpen @else commentOpen @endif" x-collapse
             class="panel-collapse mt-2 space-y-2" id="comment-{{ $comment->id }}">
            <div class="mb-1">
                @if($isManualSpam)
                    <span class="text-red-700 font-semibold"><s>Comment hidden (marked as spam)</s></span>
                @else
                    {!! nl2br(e($comment->text)) !!}
                @endif
            </div>
        </div>
        <div class="hstack align-items-center mb-0" style="margin-left:-.25rem;">
            @auth
                <form method="POST"
                      action="{{ route('blog.comment.reaction.toggle', ['type' => 'like', 'comment' => $comment->id]) }}">
                    @csrf
                    <button class="icon-btn me-1">
                        <svg class="svg-icon material-symbols-filled material-symbols-thumb_up" width="48" height="48">
                            <use xlink:href="#google-thumb_up-fill"></use>
                        </svg>
                    </button>
                </form>
                <span
                    class="me-3 small">({{ $comment->countReactions('like') - $comment->countReactions('dislike') }})</span>
                <form method="POST"
                      action="{{ route('blog.comment.reaction.toggle', ['type' => 'dislike', 'comment' => $comment->id]) }}">
                    @csrf
                    <button class="icon-btn me-4">
                        <svg class="svg-icon material-symbols-outlined material-symbols-thumb_down" width="48"
                             height="48">
                            <use xlink:href="#google-thumb_down"></use>
                        </svg>
                    </button>
                </form>
                <span><a class="btn btn-sm btn-secondary rounded-pill small" role="button" data-toggle="collapse"
                         href="#replyCommentT" aria-expanded="false" aria-controls="collapseExample">Reply</a></span>
                @if(Auth::getUser()->id !== $commentByID)
                    <button class="btn btn-sm btn-danger rounded-pill small">Report</button>
                @endif
                @if((count($comment->replies) === 0) || Auth::getUser()->id === $commentByID)
                    <button class="btn btn-sm btn-danger rounded-pill small">Delete</button>
                @endif
            @endauth
        </div>
        <div style="margin-left:-.769rem;">
            @if($comment->replies->isNotEmpty())
                <button class="btn btn-primary rounded-pill d-inline-flex align-items-center collapsed"
                        data-bs-toggle="collapse" data-bs-target="#collapse-comment{{ $comment->id }}"
                        aria-expanded="true" aria-controls="collapse-comment{{ $comment->id }}">
                    <i class="chevron-down zmdi zmdi-chevron-down fs-4 me-2"></i>
                    <i class="chevron-up zmdi zmdi-chevron-up fs-4 me-2"></i>
                    <span>{{ count($comment->replies) }} replies</span>
                </button>
            @endif
        </div>
    </div>
</div>
