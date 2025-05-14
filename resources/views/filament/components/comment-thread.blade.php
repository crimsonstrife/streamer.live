@props(['comment'])
@php
    $isManualSpam = $comment->is_spam;
    $isAutoSpam   = ! $isManualSpam && $comment->is_spam_auto;
    $highSpamRisk = $comment->spam_score > 4;
@endphp
@push('styles')
    <style>
        .post-comments {
            padding-bottom: 9px;
            margin: 5px 0 5px;
        }

        .comments-nav {
            border-bottom: 1px solid #eee;
            margin-bottom: 5px;
        }

        .post-comments .comment-meta {
            border-bottom: 1px solid #eee;
            margin-bottom: 5px;
        }

        .post-comments .media {
            border-left: 1px dotted #000;
            border-bottom: 1px dotted #000;
            margin-bottom: 5px;
            padding-left: 10px;
        }

        .post-comments .media-heading {
            font-size: 12px;
            color: grey;
        }

        .post-comments .comment-meta a {
            font-size: 12px;
            color: grey;
            font-weight: bolder;
            margin-right: 5px;
        }
    </style>
@endpush
{{-- Alpine for toggling hidden comments --}}
<div x-data="{ commentOpen: true, spamCommentOpen: false }" class="mb-4 comment">
    <div class="media">
        <div class="media-heading">
            <button
                @click="commentOpen = ! commentOpen"
                :aria-expanded="commentOpen"
                type="button"
                class="btn btn-default btn-xs">
                <span x-text="commentOpen ? '–' : '+'"></span>
            </button>
            <div class="text-sm text-gray-500">
                <strong>{{ $comment->commentedBy->name ?? '—' }}</strong>
            </div>
            <span
                class="label label-info"></span>{{ $comment->created_at->diffForHumans() }}@if($comment->updated_at->gt($comment->created_at))
                (edited {{ $comment->updated_at->diffForHumans() }})
            @endif
        </div>
        <div
            x-show="commentOpen"
            x-collapse
            class="panel-collapse mt-2 space-y-2"
            id="comment-{{ $comment->id }}">
            <div class="media-left">
                <div class="vote-wrap">
                    <div class="vote up">
                        <form method="POST"
                              action="{{ route('blog.comment.reaction.toggle', ['type' => 'like', 'comment' => $comment->id]) }}">
                            @csrf
                            <button class="btn btn-sm btn-outline-primary" type="submit">
                                👍 Like ({{ $comment->countReactions('like') }})
                            </button>
                        </form>
                    </div>
                    <div class="vote down">
                        <form method="POST"
                              action="{{ route('blog.comment.reaction.toggle', ['type' => 'dislike', 'comment' => $comment->id]) }}">
                            @csrf
                            <button class="btn btn-sm btn-outline-primary" type="submit">
                                👎 Dislike ({{ $comment->countReactions('dislike') }})
                            </button>
                        </form>
                    </div>
                </div>
                <!-- vote-wrap -->
            </div>
            <!-- media-left -->
            <div class="media-body">
                {{-- Normal comment --}}
                @include('filament.components.partials.comment-thread-normal', ['comment' => $comment])
            </div>
            <div class="comment-meta">
                @auth
                    <span><a href="#">delete</a></span>
                    <span><a href="#">report</a></span>
                    <span><a href="#">hide</a></span>
                    <span>
                    <a class="reply-link" role="button" data-toggle="collapse" href="#replyCommentT"
                       aria-expanded="false" aria-controls="collapseExample">reply</a>
                </span>
                @endauth
            </div>
        </div>
    </div>
</div>
