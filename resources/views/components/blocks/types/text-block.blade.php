@if ($isEditing && !$isPreview)
    <div class="p-4 bg-white border rounded shadow">
        <textarea wire:model="blocks.{{ $index }}.content.text" class="form-control" placeholder="Enter text..."></textarea>
    </div>
@elseif ($isEditing && $isPreview)
    <p class="p-4 bg-white rounded shadow">{{ $block->content['text'] ?? '' }}</p>
@else
    <p class="p-4 bg-white rounded shadow">{{ $block->content['text'] ?? '' }}</p>
@endif
