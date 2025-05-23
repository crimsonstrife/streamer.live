<div {{ $attributes->merge(['class' => 'row g-3']) }}>
    <div class="col-md-4">
        <x-section-title>
            <x-slot name="title">{{ $title }}</x-slot>
            <x-slot name="description">{{ $description }}</x-slot>
        </x-section-title>
    </div>

    <div class="col-md-8">
        <div class="shadow-sm card">
            <div class="card-body">
                {{ $content }}
            </div>
        </div>
    </div>
</div>