<div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-bold">{{ $page->title }} - Page Builder</h2>

    <!-- Available Blocks -->
    <div class="mt-4">
        <h3 class="text-lg font-semibold">Available Blocks</h3>
        <div class="grid grid-cols-3 gap-2">
            @foreach($availableBlocks as $block)
                <button wire:click="assignBlock({{ $block->id }})" class="px-4 py-2 text-white bg-blue-500 rounded">
                    {{ $block->name }}
                </button>
            @endforeach
        </div>
    </div>

    <!-- Assigned Blocks -->
    <div class="mt-6">
        <h3 class="text-lg font-semibold">Assigned Blocks</h3>
        <div class="space-y-4">
            @foreach($assignedBlocks as $block)
                <div class="p-4 bg-gray-100 rounded shadow">
                    <h3 class="text-lg font-semibold">{{ $block->name }}</h3>
                    <button wire:click="removeBlock({{ $block->id }})" class="text-red-500">Remove</button>
                </div>
            @endforeach
        </div>
    </div>

    <button wire:click="save" class="px-4 py-2 mt-6 text-white bg-indigo-500 rounded">Save Page</button>
</div>