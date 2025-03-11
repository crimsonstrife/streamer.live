@props(['value'])

<label {{ $attributes->merge(['class' => 'form-label fw-semibold text-dark']) }}>
    {{ $value ?? $slot }}
</label>