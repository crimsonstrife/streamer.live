@if ($isEditing && !$isPreview)
    <div class="p-4 bg-white border rounded shadow">
        <input type="text" wire:model="blocks.{{ $index }}.content.url" class="form-control"
            placeholder="Image URL">
    </div>
@elseif ($isEditing && $isPreview)
    <img src="{{ $block->content['url'] ?? '' }}" class="w-full rounded shadow">
@else
    <img src="{{ $block->content['url'] ?? '' }}" class="w-full rounded shadow">
@endif
