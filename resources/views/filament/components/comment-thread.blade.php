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
<link
    href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
    type="stylesheet">
<svg xmlns="http://www.w3.org/2000/svg" class="d-none">
    <symbol id="google-thumb_up" viewBox="0 -960 960 960">
        <path
            d="M716-120H272v-512l278-288 39 31q6 5 9 14t3 22v10l-45 211h299q24 0 42 18t18 42v81.839q0 7.161 1.5 14.661T915-461L789-171q-8.878 21.25-29.595 36.125Q738.689-120 716-120Zm-384-60h397l126-299v-93H482l53-249-203 214v427Zm0-427v427-427Zm-60-25v60H139v392h133v60H79v-512h193Z"></path>
    </symbol>
    <symbol id="google-thumb_up-fill" viewBox="0 -960 960 960">
        <path
            d="M721-120H254v-512l278-288 33 26q11 8 14.5 18t3.5 23v10l-45 211h322q23 0 41.5 18.5T920-572v82q0 11-2.5 25.5T910-439L794-171q-9 21-29.5 36T721-120ZM194-632v512H80v-512h114Z"></path>
    </symbol>
    <symbol id="google-thumb_down" viewBox="0 -960 960 960">
        <path
            d="M242-840h444v512L408-40l-39-31q-6-5-9-14t-3-22v-10l45-211H103q-24 0-42-18t-18-42v-81.839Q43-477 41.5-484.5T43-499l126-290q8.878-21.25 29.595-36.125Q219.311-840 242-840Zm384 60H229L103-481v93h373l-53 249 203-214v-427Zm0 427v-427 427Zm60 25v-60h133v-392H686v-60h193v512H686Z"></path>
    </symbol>
    <symbol id="google-thumb_down-fill" viewBox="0 -960 960 960">
        <path
            d="M239-840h467v512L428-40l-33-26q-11-8-14.5-18t-3.5-23v-10l45-211H100q-23 0-41.5-18.5T40-388v-82q0-11 2.5-25.5T50-521l116-268q9-21 29.5-36t43.5-15Zm527 512v-512h114v512H766Z"></path>
    </symbol>
</svg>
{{-- Alpine for toggling hidden comments --}}
<div x-data="{ commentOpen: true, spamCommentOpen: false, hideContent: false }" class="mb-4 comment">
    @include('filament.components.partials.thread', ['comment' => $comment, 'post' => $post])
</div>
