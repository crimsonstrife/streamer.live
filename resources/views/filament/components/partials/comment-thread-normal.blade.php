@props(['comment', 'post'])
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
@php
    $isManualSpam = $comment->is_spam;
    $isAutoSpam   = ! $isManualSpam && $comment->is_spam_auto;
    $highSpamRisk = $comment->spam_score > 4;
@endphp
@if ($isManualSpam)
    {{-- Manual spam: fully hidden by default --}}
    <div class="bg-red-50 border border-red-200 rounded p-4">
        <div class="flex justify-between items-center">
            <span class="text-red-700 font-semibold">Comment hidden (marked as spam)</span>
            <button
                @click="spamCommentOpen = ! spamCommentOpen"
                class="text-blue-600 underline text-sm"
            >
                <span x-text="spamCommentOpen ? 'Hide' : 'Show comment'"></span>
            </button>
        </div>
        <div
            x-show="spamCommentOpen"
            x-collapse
            class="panel-collapse mt-2 space-y-2"
            id="comment-{{ $comment->id }}">
            @elseif ($isAutoSpam || $highSpamRisk)
                {{-- Auto-spam: collapsed but labelled as potential --}}
                <div class="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <div class="flex justify-between items-center">
                        <span class="text-yellow-800 font-semibold">Potential spam comment</span>
                        <button
                            @click="spamCommentOpen = ! spamCommentOpen"
                            class="text-blue-600 underline text-sm"
                        >
                            <span x-text="spamCommentOpen ? 'Hide' : 'Show comment'"></span>
                        </button>
                    </div>
                    <div
                        x-show="spamCommentOpen"
                        x-collapse
                        class="panel-collapse mt-2 space-y-2"
                        id="comment-{{ $comment->id }}">
                        @else
                            <div>
                                <div>
                                    @endif
    {{-- The parent comment --}}
                                    <div class="comment-body">
                                        {!! nl2br(e($comment->text)) !!}
    </div>
                                </div>
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
    @endif
