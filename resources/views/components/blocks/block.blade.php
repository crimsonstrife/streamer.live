<div class="p-4 mb-2 border rounded shadow bg-light d-flex flex-column">
    <div class="mb-2 d-flex justify-content-between align-items-center">
        <h4 class="mb-0 h6">{{ ucfirst($block['type']) }} Block</h4>
        <span class="cursor-move handle text-muted">&#x2630;</span>
    </div>

    dd($block);

    @if ($block['type'] === 'text')
        @include('components.blocks.types.text-block', ['block' => $block])
    @elseif ($block['type'] === 'image')
        @include('components.blocks.types.image-block', ['block' => $block])
    @elseif ($block['type'] === 'embed')
        @include('components.blocks.types.embed-block', ['block' => $block])
    @else
        <p class="text-danger">Block type view not found.</p>
    @endif

    <button type="button" wire:click="removeBlock({{ $block['id'] }})" class="mt-2 btn btn-danger btn-sm">Remove</button>
</div>
