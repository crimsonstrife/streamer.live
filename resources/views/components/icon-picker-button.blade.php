@props(['icon'])

<button
    type="button"
    class="p-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    wire:click="$emit('iconUpdated', {{ $icon->id }})"
>
    <x-icon-display
        :svg_url="$icon->svg_url"
        :svg_code="$icon->svg_code"
        class="w-6 h-6"
    />
</button>
