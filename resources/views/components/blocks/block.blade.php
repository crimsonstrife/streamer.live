<div class="p-4 mb-2 border rounded shadow bg-light d-flex flex-column" wire:sortable.item="{{ $block['id'] }}" wire:key="block-{{ $block['id'] }}">
    <div class="mb-2 d-flex justify-content-between align-items-center">
        <h4 class="mb-0 h6">{{ ucfirst($block['display_name']) }}</h4>
        <span class="cursor-move handle text-muted" wire:sortable.handle>&#x2630;</span>
    </div>

    @if ($block['type'] === 'text')
        <x-blocks.types.text-block :block="$block" :index="$index" />
    @elseif ($block['type'] === 'image')
        <x-blocks.types.image-block :block="$block" :index="$index" />
    @elseif ($block['type'] === 'embed')
        <x-blocks.types.embed-block :block="$block" :index="$index" />
    @elseif ($block['type'] === 'latest_posts')
        <x-blocks.types.latest-posts-block :block="$block" />
    @else
        <p class="text-danger">Block type view not found.</p>
    @endif

    <button type="button" wire:click="removeBlock({{ $block['id'] }})" class="mt-2 btn btn-danger btn-sm">Remove</button>
</div>
