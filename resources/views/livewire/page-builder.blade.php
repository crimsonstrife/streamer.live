<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold">{{ $page->title }} - Page Builder</h2>

    <!-- Open Modal Button -->
    <button wire:click="openModal" class="px-4 py-2 text-white bg-green-500 rounded">+ Add Block</button>

    <!-- Modal -->
    @if ($showModal)
        <div class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div class="w-1/3 p-6 bg-white rounded-lg shadow-lg">
                <h3 class="text-xl font-semibold">Select a Block Type</h3>

                <!-- Add Block Selection -->
                <select wire:model="selectedBlockType" class="w-full p-2 mt-2 border rounded">
                    <option value="">Select a Block Type</option>
                    @foreach ($availableBlocks as $key => $block)
                        <option value="{{ $key }}">{{ $block['display_name'] }}</option>
                    @endforeach
                </select>

                <div class="flex justify-end mt-4 space-x-2">
                    <button wire:click="closeModal" class="px-4 py-2 text-white bg-gray-400 rounded">Cancel</button>
                    <button wire:click="addBlock" class="px-4 py-2 text-white bg-blue-500 rounded">Add Block</button>
                </div>
            </div>
        </div>
    @endif

    <!-- Blocks List -->
    <div wire:sortable="updateBlockOrder" class="mt-4 space-y-4">
        @foreach ($assignedBlocks as $loopIndex => $block)
            <div wire:sortable.item="{{ $block['id'] }}" wire:key="block-{{ $block['id'] }}"
                class="p-4 bg-gray-100 rounded shadow cursor-move">
                <h3 class="text-lg font-semibold">{{ ucfirst($block['type']) }} Block</h3>

                @if ($block['type'] === 'text')
                    <textarea wire:change="updateBlockContent({{ $loopIndex }}, 'text', $event.target.value)" class="w-full p-2 border">{{ $block['content']['text'] ?? '' }}</textarea>
                @elseif ($block['type'] === 'image')
                    <input type="text"
                        wire:change="updateBlockContent({{ $loopIndex }}, 'url', $event.target.value)"
                        class="w-full p-2 border" placeholder="Image URL" value="{{ $block['content']['url'] ?? '' }}">
                @elseif ($block['type'] === 'embed')
                    <input type="text"
                        wire:change="updateBlockContent({{ $loopIndex }}, 'embed_url', $event.target.value)"
                        class="w-full p-2 border" placeholder="Embed URL"
                        value="{{ $block['content']['embed_url'] ?? '' }}">
                @endif

                <button wire:click="removeBlock({{ $block['id'] }})" class="mt-2 text-red-500">Remove</button>
            </div>
        @endforeach
    </div>

    <button wire:click="save" class="px-4 py-2 mt-6 text-white bg-indigo-500 rounded">Save Page</button>
</div>
