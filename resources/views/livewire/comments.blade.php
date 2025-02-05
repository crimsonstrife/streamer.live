<div class="mt-4">
    @auth
        <div class="mb-4">
            <textarea wire:model="comment" class="w-full p-2 border rounded" placeholder="Add a comment..."></textarea>
            <button wire:click="addComment" class="px-4 py-2 mt-2 text-white bg-blue-500 rounded">Comment</button>
        </div>
    @else
        <p class="text-gray-500">Login to comment.</p>
    @endauth

    <div class="space-y-4">
        @foreach($comments as $comment)
            <div class="p-4 bg-gray-100 rounded">
                <p><strong>{{ $comment->user->username }}</strong> said:</p>
                <p>{{ $comment->content }}</p>

                <button wire:click="$set('parentId', {{ $comment->id }})" class="text-sm text-blue-500">Reply</button>

                @if($comment->children)
                    <div class="pl-4 ml-6 border-l border-gray-300">
                        @foreach($comment->children as $reply)
                            <p><strong>{{ $reply->user->username }}</strong> replied:</p>
                            <p>{{ $reply->content }}</p>
                        @endforeach
                    </div>
                @endif
            </div>
        @endforeach
    </div>
</div>
