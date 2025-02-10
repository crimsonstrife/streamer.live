<div class="p-6 bg-white rounded-lg shadow">
    @if ($page)
        <h2 class="text-xl font-bold">{{ $page->title }} - Page Builder</h2>
    @endif

    <div wire:sortable="updateBlockOrder" class="mt-4 space-y-4">
        @foreach ($blocks as $block)
            <div wire:sortable.item="{{ $block->id }}" wire:key="block-{{ $block->id }}"
                class="p-4 bg-gray-100 rounded shadow cursor-move">
                <h3 class="text-lg font-semibold">{{ ucfirst($block->type) }} Block</h3>

                @if ($block->type === 'text')
                    <textarea wire:model="blocks.{{ $loop->index }}.content.text" class="w-full p-2 border"></textarea>
                @elseif($block->type === 'image')
                    <input type="text" wire:model="blocks.{{ $loop->index }}.content.url" class="w-full p-2 border"
                        placeholder="Image URL">
                @elseif($block->type === 'embed')
                    <input type="text" wire:model="blocks.{{ $loop->index }}.content.embed_url"
                        class="w-full p-2 border" placeholder="Embed URL">
                @endif

                <button wire:click="removeBlock({{ $block->id }})" class="mt-2 text-red-500">Remove</button>
            </div>
        @endforeach
    </div>

    <button wire:click="save" class="px-4 py-2 mt-6 text-white bg-indigo-500 rounded">Save Page</button>
</div>
