<div class="p-4 mt-4 bg-gray-100 rounded {{ $level > 0 ? 'ml-' . min($level * 4, 16) : '' }}">
    <p><strong>{{ $comment->user->username }}</strong> said:</p>
    <p>{{ $comment->content }}</p>

    @auth
        <button wire:click="setReply({{ $comment->id }})" class="text-sm text-blue-500">
            {{ $parentId === $comment->id ? 'Cancel Reply' : 'Reply' }}
        </button>
    @endauth

    @if($parentId === $comment->id)
        <!-- Reply Form -->
        <div class="mt-2">
            <textarea wire:model="comment" class="w-full p-2 border rounded" placeholder="Reply to this comment..."></textarea>
            <button wire:click="addComment" class="px-4 py-2 mt-2 text-white bg-green-500 rounded">Post Reply</button>
        </div>
    @endif

    @if($comment->children->count())
        <div class="pl-4 mt-2 ml-4 border-l-2 border-gray-300">
            @foreach($comment->children as $reply)
                @include('livewire.comment-item', ['comment' => $reply, 'level' => $level + 1])
            @endforeach
        </div>
    @endif
</div>
