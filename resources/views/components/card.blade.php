<div {{ $attributes->merge(['class' => 'card shadow-lg rounded mb-4']) }}>
    <div class="card-body">
        {{ $slot }}
    </div>
</div>
