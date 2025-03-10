<button {{ $attributes->merge(['type' => 'submit', 'class' => 'btn btn-primary']) }}>
    @isset($icon)
        <i class="{{ $icon }} me-2"></i>
    @endisset
    {{ $slot }}
</button>
