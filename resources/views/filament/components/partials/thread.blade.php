@props(['comment', 'post'])
@php
    $isManualSpam = $comment->is_spam;
    $isAutoSpam   = ! $isManualSpam && $comment->is_spam_auto;
    $highSpamRisk = $comment->spam_score > 4;
    $replyLocked = $comment->replies_locked;
@endphp
<div class="comment-box">
    @include('filament.components.partials.comment', ['comment' => $comment])
    {{-- Recursively render replies --}}
    @if($comment->replies->isNotEmpty())
        <div class="collapse show" id="collapse-comment{{ $comment->id }}" style="">
            <div class="comment-replies vstack gap-3 mt-1 bg-body-tertiary p-3 rounded-3">
                @foreach($comment->replies->where('approved', true) as $reply)
                    @include('filament.components.partials.reply', ['comment' => $reply])
                @endforeach
            </div>
        </div>
    @endif
</div>
