<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight">
            {{ __('Store') }}
        </h2>
    </x-slot>

    <div class="container py-6">
        <h3 class="mb-4 text-lg font-semibold">{{ __('Featured Collections') }}</h3>

        @if ($collections->isEmpty())
            <p class="text-center text-muted">{{ __('No collections available at the moment.') }}</p>
        @else
            <div class="row">
                @foreach ($collections as $collection)
                    <div class="mb-4 col-md-4">
                        <div class="shadow-sm card">
                            <div class="card-body">
                                <h5 class="card-title">{!! html_entity_decode($collection['name']) !!}</h5>
                                <p class="card-text text-muted">{!! html_entity_decode($collection['description'] ?? __('No description available.')) !!}</p>
                                <a href="{{ route('store.collection', ['slug' => $collection->slug]) }}" class="btn btn-primary">
                                    View Collection
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        @endif
    </div>
</x-app-layout>
