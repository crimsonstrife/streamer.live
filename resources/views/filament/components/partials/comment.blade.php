@props(['comment', 'post'])
@php
    $isManualSpam = $comment->is_spam;
    $isAutoSpam   = ! $isManualSpam && $comment->is_spam_auto;
    $highSpamRisk = $comment->spam_score > 4;
    $commentByID = $comment->commentedBy->id;
    $postAuthorID = $post->author->user_id;
    $commentByAuthor = $commentByID === $postAuthorID;
    $replyLocked = $comment->replies_locked;
@endphp
<div class="d-flex comment">
    @if ($isManualSpam || $isAutoSpam || $highSpamRisk)
        {{-- Auto-spam detection: collapsed by default to hide the message, labelled as potential spam to warn users --}}
        <button @click="spamCommentOpen = ! spamCommentOpen" :aria-expanded="spamCommentOpen" type="button"
                class="btn btn-default btn-xs">
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
        <div x-show="@if($isManualSpam || ($isAutoSpam || $highSpamRisk)) spamCommentOpen @else commentOpen @endif"
             x-collapse
             class="panel-collapse mt-2 space-y-2" id="comment-{{ $comment->id }}">
            <div class="mb-1">
                @if($isManualSpam)
                    <span class="text-red-700 font-semibold"><s>Comment hidden (marked as spam)</s></span>
                @elseif(($isAutoSpam && !$highSpamRisk) || ($isAutoSpam && $highSpamRisk))
                    <span class="text-yellow-800 font-semibold">Potential spam comment</span>
                    <button @click="hideContent = ! hideContent" :aria-expanded="hideContent" type="button"
                            class="btn btn-default btn-xs">
                        <span x-text="hideContent ? 'Hide' : 'Show Content'"></span>
                    </button>
                    <div x-show="hideContent" x-collapse class="panel-collapse mt-2 space-y-2"
                         id="comment-{{ $comment->id }}">
                        {!! nl2br($comment->content) !!}
                    </div>
                @else
                    {!! nl2br($comment->content) !!}
                @endif
            </div>
        </div>
        <div class="hstack align-items-center mb-0" style="margin-left:-.25rem;">
            @auth
                @include('filament.components.partials.likes', ['comment' => $comment, 'post' => $post])
                @if(! $comment->replies_locked)
                    <span>
                        <a class="btn btn-link small reply-link" role="button" data-toggle="collapse"
                             data-reply-id="{{ $comment->id }}"
                             aria-expanded="false"
                             aria-controls="replyCommentT">Reply</a>
                    </span>
                @else
                    <span class="text-muted small" aria-label="Replies are locked for this comment. You cannot reply." title="Replies are locked for this comment. You cannot reply.">Replies locked</span>
                @endif
                @if(Auth::getUser()->id !== $commentByID)
                    <button class="btn btn btn-link small">Report</button>
                @endif
                @if((count($comment->replies) === 0) || Auth::getUser()->id === $commentByID)
                    <button class="btn btn btn-link small">Delete</button>
                @endif
            @endauth
        </div>
        <div style="margin-left:-.769rem;">
            @if($comment->replies->isNotEmpty())
                <button class="btn btn-link d-inline-flex align-items-center collapsed"
                        data-bs-toggle="collapse" data-bs-target="#collapse-comment{{ $comment->id }}"
                        aria-expanded="true" aria-controls="collapse-comment{{ $comment->id }}">
                    <i class="chevron-down zmdi zmdi-chevron-down fs-4 me-2"></i>
                    <i class="chevron-up zmdi zmdi-chevron-up fs-4 me-2"></i>
                    <span>{{ count($comment->replies->where('approved', true)) }} replies</span>
                </button>
            @endif
        </div>
    </div>
</div>
