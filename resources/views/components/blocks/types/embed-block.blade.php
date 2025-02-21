@if ($isEditing)
    <div class="p-4 bg-white border rounded shadow">
        <input type="text" wire:model="blocks.{{ $index }}.content.embed_url" class="form-control"
            placeholder="Embed URL">
    </div>
@else
    <iframe src="{{ $block->content['embed_url'] ?? '' }}" class="w-full h-64 rounded shadow"></iframe>
@endif
