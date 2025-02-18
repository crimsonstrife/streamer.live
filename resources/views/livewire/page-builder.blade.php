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
                                    <option value="{{ $block['type'] }}">{{ $block['display_name'] }}</option>
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
            <x-blocks.block
                :block="$block"
                :index="$index"
                wire:key="block-{{ $block['id'] }}"
            />
        @endforeach
    </div>

    <button type="button" wire:click="save" class="px-4 py-2 mt-6 text-white bg-indigo-500 rounded">Save Page</button>
</div>
