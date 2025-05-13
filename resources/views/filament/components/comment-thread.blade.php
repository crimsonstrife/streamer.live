@props(['comment'])

@php
    $isManualSpam = $comment->is_spam;
    $isAutoSpam   = ! $isManualSpam && $comment->is_spam_auto;
    $highSpamRisk = $comment->spam_score > 4;
@endphp

{{-- Alpine for toggling hidden comments --}}
<div x-data="{ open: false }" class="mb-4 comment">

    @if ($isManualSpam)
        {{-- Manual spam: fully hidden by default --}}
        <div class="bg-red-50 border border-red-200 rounded p-4">
            <div class="flex justify-between items-center">
                <span class="text-red-700 font-semibold">Comment hidden (marked as spam)</span>
                <button
                    @click="open = ! open"
                    class="text-blue-600 underline text-sm"
                >
                    <span x-text="open ? 'Hide' : 'Show comment'"></span>
                </button>
            </div>
            <div x-show="open" class="mt-3">
                {{-- render the “normal” comment UI --}}
                @include('filament.components.partials.comment-thread-normal', ['comment' => $comment])
            </div>
        </div>

    @elseif ($isAutoSpam || $highSpamRisk)
        {{-- Auto-spam: collapsed but labelled as potential --}}
        <div class="bg-yellow-50 border border-yellow-200 rounded p-4">
            <div class="flex justify-between items-center">
                <span class="text-yellow-800 font-semibold">Potential spam comment</span>
                <button
                    @click="open = ! open"
                    class="text-blue-600 underline text-sm"
                >
                    <span x-text="open ? 'Hide' : 'Show comment'"></span>
                </button>
            </div>
            <div x-show="open" class="mt-3">
                @include('filament.components.partials.comment-thread-normal', ['comment' => $comment])
            </div>
        </div>

    @else
        {{-- Normal comment --}}
        @include('filament.components.partials.comment-thread-normal', ['comment' => $comment])
    @endif

</div>
