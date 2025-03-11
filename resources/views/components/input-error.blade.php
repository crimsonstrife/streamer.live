@props(['for'])

@error($for)
    <div {{ $attributes->merge(['class' => 'invalid-feedback d-block text-danger small']) }}>
        {{ $message }}
    </div>
@enderror