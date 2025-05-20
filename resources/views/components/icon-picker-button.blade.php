@props(['icon'])
<!-- icon-picker-button.blade.php -->
<div data-icon-id="{{ $icon->id }}" data-type="{{ $icon->type }}" data-style="{{ $icon->style }}"
     class="p-2 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 icon-picker-button"
     style="height: 100%; width: 100%;">
    <!-- Include the ID and Name in a hidden span for debugging -->
    <span style="display:none">ID: {{ $icon->id }}, Name: {{ $icon->name ?? 'undefined' }}</span>
    <x-icon-preview :icon="$icon->id"/>
</div>
