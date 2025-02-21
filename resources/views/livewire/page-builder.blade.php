<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold">{{ $page->title }} - Page Builder</h2>

    <div class="mb-4 d-flex justify-content-between align-items-center">
        <button type="button" wire:click="openModal" class="btn btn-primary">+ Add Block</button>

        <button type="button" wire:click="togglePreview" class="btn btn-outline-secondary">
            {{ $isPreviewMode ? 'Edit Mode' : 'Preview Mode' }}
        </button>
    </div>

    <!-- Modal -->
    <!-- Modal -->
    @if ($showModal)
        <div class="modal fade show" style="display: block;" aria-modal="true">
            <div class="modal-dialog">
                <form wire:submit.prevent="addBlock">
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
    <div wire:sortable="updateBlockOrder" wire:poll.keep-alive class="mt-4 space-y-4">
        @foreach ($blocks as $index => $block)
            <x-blocks.block :block="$block" :index="$index" :isEditing="true" :isPreview="$isPreviewMode" wire:key="block-{{ $block['id'] ?? Str::uuid() }}"
                wire:sortable.item="{{ $block['id'] }}" />
        @endforeach
    </div>

    <button type="button" wire:click="save" class="px-4 py-2 mt-6 rounded btn-bd-primary">Save Page</button>
</div>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        let sortableContainer = document.querySelector("[wire\\:sortable]");

        if (sortableContainer && typeof Sortable !== "undefined") {
            new Sortable(sortableContainer, {
                handle: ".handle",
                animation: 150,
                onEnd: function(evt) {
                    let orderedIds = [...sortableContainer.children].map(el => ({
                        value: el.getAttribute("wire:sortable.item")
                    }));

                    // Prevent sending empty or duplicate order
                    if (orderedIds.length > 0) {
                        console.log("Dragging stopped. New order:", orderedIds); // Debugging
                        if (typeof Livewire !== "undefined" && typeof Livewire.emit ===
                            "function") {
                            Livewire.emit("updateBlockOrder", orderedIds);
                        } else {
                            console.error("Livewire is not defined or emit function is missing.");
                        }
                    }
                }
            });
        } else {
            console.error("SortableJS not found or sortable container is missing.");
        }
    });
</script>
