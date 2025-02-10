<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold">{{ $page->title }} - Page Builder</h2>

    <div wire:sortable="updateBlockOrder" class="mt-4 space-y-4">
        @foreach ($assignedBlocks as $loopIndex => $block)
            <div wire:sortable.item="{{ $block['id'] }}" wire:key="block-{{ $block['id'] }}"
                class="p-4 bg-gray-100 rounded shadow cursor-move">
                <h3 class="text-lg font-semibold">{{ ucfirst($block['type']) }} Block</h3>

                @if ($block['type'] === 'text')
                    <textarea
                        wire:change="updateBlockContent({{ $loopIndex }}, 'text', $event.target.value)"
                        class="w-full p-2 border"
                    >{{ $block['content']['text'] ?? '' }}</textarea>
                @elseif ($block['type'] === 'image')
                    <input type="text"
                        wire:change="updateBlockContent({{ $loopIndex }}, 'url', $event.target.value)"
                        class="w-full p-2 border"
                        placeholder="Image URL"
                        value="{{ $block['content']['url'] ?? '' }}">
                @elseif ($block['type'] === 'embed')
                    <input type="text"
                        wire:change="updateBlockContent({{ $loopIndex }}, 'embed_url', $event.target.value)"
                        class="w-full p-2 border"
                        placeholder="Embed URL"
                        value="{{ $block['content']['embed_url'] ?? '' }}">
                @endif

                <button wire:click="removeBlock({{ $block['id'] }})" class="mt-2 text-red-500">Remove</button>
            </div>
        @endforeach
    </div>

    <button wire:click="save" class="px-4 py-2 mt-6 text-white bg-indigo-500 rounded">Save Page</button>
</div>