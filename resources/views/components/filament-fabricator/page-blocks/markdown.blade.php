@aware(['page','markdown', 'customClass', 'showPreview' => false, 'editorHeight' => 'medium', 'allowUnsafe' => false])

@php
    $height = match ($editorHeight) {
        'small' => 5,
        'medium' => 10,
        'large' => 20,
        default => 10,
    };
@endphp

<div class="{{ $customClass }}">
    <div class="prose">
        {!! $allowUnsafe
            ? \Illuminate\Support\Str::markdown($markdown)
            : \Illuminate\Support\Str::markdown(strip_tags($markdown)) !!}
    </div>
</div>
