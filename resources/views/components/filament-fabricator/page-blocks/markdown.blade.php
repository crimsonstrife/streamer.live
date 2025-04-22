@aware(['page','markdown', 'customClass', 'showPreview' => false, 'allowUnsafe' => false])

<div class="{{ $customClass }}">
    <div class="prose">
        {!! $allowUnsafe
            ? \Illuminate\Support\Str::markdown($markdown)
            : \Illuminate\Support\Str::markdown(strip_tags($markdown)) !!}
    </div>
</div>
