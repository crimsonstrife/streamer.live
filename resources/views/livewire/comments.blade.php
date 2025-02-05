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
            @include('livewire.comment-item', ['comment' => $comment, 'level' => 0])
        @endforeach
    </div>
</div>
