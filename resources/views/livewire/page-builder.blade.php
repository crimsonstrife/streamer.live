<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold">{{ $page->title }} - Page Builder</h2>

    <!-- Open Modal Button -->
    <button type="button" wire:click="openModal" class="px-4 py-2 text-white bg-green-500 rounded">+ Add Block</button>

    <!-- Modal -->
    @if ($showModal)
        <div class="modal fade show" style="display: block;" aria-modal="true">
            <div class="modal-dialog">
                <form wire:submit.prevent="addBlock">
                    @csrf <!-- Ensure CSRF token -->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Select a Block Type</h5>
                            <button type="button" class="btn-close" wire:click="closeModal"></button>
                        </div>
                        <div class="modal-body">
                            <select wire:model="selectedBlockType" class="form-control">
                                <option value="">Select Block</option>
                                @foreach ($availableBlocks as $block)
                                    <option value="{{ $block['display_name'] }}">{{ $block['display_name'] }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" wire:click="closeModal">Cancel</button>
                            <button type="submit" class="btn btn-primary">Add Block</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    @endif

    <!-- Blocks List -->
    <div wire:sortable="updateBlockOrder" class="mt-4 space-y-4">
        @foreach ($blocks as $index => $block)
            <div wire:sortable.item="{{ $block['id'] }}" wire:key="block-{{ $block['id'] }}"
                class="p-4 bg-gray-100 rounded shadow cursor-move">
                <h3 class="text-lg font-semibold">{{ ucfirst($block['type']) }} Block</h3>

                @if ($block['type'] === 'text')
                    <textarea wire:model="blocks.{{ $index }}.content.text" class="w-full p-2 border"></textarea>
                @elseif ($block['type'] === 'image')
                    <input type="text" wire:model="blocks.{{ $index }}.content.url" class="w-full p-2 border"
                        placeholder="Image URL">
                @elseif ($block['type'] === 'embed')
                    <input type="text" wire:model="blocks.{{ $index }}.content.embed_url"
                        class="w-full p-2 border" placeholder="Embed URL">
                @endif

                <button type="button" wire:click="removeBlock({{ $block['id'] }})"
                    class="mt-2 text-red-500">Remove</button>
            </div>
        @endforeach
    </div>

    <button type="button" wire:click="save" class="px-4 py-2 mt-6 text-white bg-indigo-500 rounded">Save Page</button>
</div>
