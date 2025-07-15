@props(['comment', 'post'])
@php
    $isManualSpam = $comment->is_spam;
    $isAutoSpam   = ! $isManualSpam && $comment->is_spam_auto;
    $highSpamRisk = $comment->spam_score > 4;
    $replyLocked = $comment->replies_locked;
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

        .ski, .svg-icon, .icon-btn svg, .icon-btn-base svg, .icon-btn img, .icon-btn-base img {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: var(--sk-icon-size);
            height: var(--sk-icon-size);
            fill: currentcolor;
        }

        .icon-btn, .icon-btn-base {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: var(--sk-icon-btn-size);
            height: var(--sk-icon-btn-size);
            font-size: var(--sk-icon-btn-size);
            line-height: 1;
            padding: var(--sk-icon-btn-padding);
            box-sizing: content-box;
            aspect-ratio: 1/1;
        }

        .ski::before {
            font-size: var(--sk-icon-size);
        }

        .icon-btn {
            color: var(--sk-icon-btn-color);
            background-color: transparent;
            border-radius: 50%;
            border: 0;
            outline: solid 1px transparent;
        }

        .icon-btn:hover {
            color: var(--sk-icon-btn-hover-color);
            background-color: rgba(0, 0, 0, 0.1);
            background-color: color-mix(in srgb, var(--sk-icon-btn-hover-bg) 10%, transparent);
        }

        .icon-btn:hover:active {
            color: var(--sk-icon-btn-active-color);
            background-color: rgba(0, 0, 0, 0.2);
            outline-color: rgba(0, 0, 0, 0.4);
            background-color: color-mix(in srgb, var(--sk-icon-btn-active-bg) 20%, transparent);
            outline-color: color-mix(in srgb, var(--sk-icon-btn-active-bg) 40%, transparent);
        }
    </style>
@endpush
{{-- Alpine for toggling hidden comments --}}
<div x-data="{ commentOpen: true, spamCommentOpen: false, hideContent: false }" class="mb-4 comment">
    @include('filament.components.partials.thread', ['comment' => $comment, 'post' => $post])
</div>
