<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold">{{ $page->title }} - Page Builder</h2>

    <button type="button" wire:click="openModal" class="px-4 py-2 rounded btn-bd-primary">+ Add Block</button>

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
                            <button type="button" class="btn btn-bd-secondary btn-secondary" wire:click="closeModal">Cancel</button>
                            <button type="submit" class="btn btn-bd-primary btn-primary">Add Block</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    @endif

    <div wire:sortable="updateBlockOrder" class="mt-4 space-y-4">
        @foreach ($blocks as $index => $block)
            <x-blocks.block
                :block="$block"
                :index="$index"
                :isEditing="true"
                :isPreview="$isPreviewMode"
                wire:key="block-{{ $block['id'] ?? Str::uuid() }}"
            />
        @endforeach
    </div>

    <button type="button" wire:click="save" class="px-4 py-2 mt-6 rounded btn-bd-primary">Save Page</button>
</div>

<script>
    document.addEventListener("livewire:load", function () {
        Livewire.hook('message.processed', (message, component) => {
            if (typeof tinymce !== 'undefined') {
                tinymce.remove();
                tinymce.init({ selector: 'textarea.wysiwyg' });
            }
        });
    });
</script>
