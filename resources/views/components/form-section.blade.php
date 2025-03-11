@props(['submit'])

<div {{ $attributes->merge(['class' => 'row g-3']) }}>
    <x-section-title>
        <x-slot name="title">{{ $title }}</x-slot>
        <x-slot name="description">{{ $description }}</x-slot>
    </x-section-title>

    <div class="col-md-8">
        <form wire:submit.prevent="{{ $submit }}">
            <div class="shadow-sm card">
                <div class="card-body">
                    <div class="row g-3">
                        {{ $form }}
                    </div>
                </div>

                @if (isset($actions))
                    <div class="card-footer text-end">
                        {{ $actions }}
                    </div>
                @endif
            </div>
        </form>
    </div>
</div>