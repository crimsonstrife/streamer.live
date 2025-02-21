@if ($isEditing)
    <div class="p-4 bg-white border rounded shadow">
        <input type="text" wire:model="blocks.{{ $index }}.content.url" class="form-control"
            placeholder="Image URL">
    </div>
@else
    <img src="{{ $block->content['url'] ?? '' }}" class="w-full rounded shadow">
@endif
