@php
    $blockType = 'components.blocks.types.' . str_replace('_', '-', $block['type']) . '-block';
@endphp

@if ($isEditing && $block['id'])
    <div wire:sortable.item="{{ $block['id'] ?? Str::uuid() }}"
        class="p-4 mb-2 border rounded shadow bg-light d-flex flex-column">
        <div wire:sortable.handle class="mb-2 cursor-move d-flex justify-content-between align-items-center">
            <h4 class="mb-0 h6">{{ ucfirst($block['display_name']) }}</h4>
            <span class="cursor-move handle text-muted" wire:sortable.handle>&#x2630;</span>
        </div>
    @else
        <div class="p-3">
@endif

@if (view()->exists($blockType))
    @include($blockType, [
        'block' => $block,
        'isEditing' => $isEditing ?? false,
        'isPreview' => $isPreview ?? false,
        'index' => $index ?? null,
    ])
@else
    <p class="text-danger">Block type "{{ $block->type }}" view not found.</p>
@endif

@if ($isEditing && $block['id'])
    <button type="button" wire:click="removeBlock({{ $block['id'] }})"
        class="mt-2 btn btn-danger btn-sm">Remove</button>
@endif
</div>
