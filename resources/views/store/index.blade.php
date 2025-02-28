<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight">
            {{ __('Store') }}
        </h2>
    </x-slot>

    <div class="container py-6">
        <h3 class="mb-4 text-lg font-semibold">{{ __('Featured Collections') }}</h3>

        @if (empty($collections['results']) || count($collections['results']) === 0)
            <p class="text-center text-muted">{{ __('No collections available at the moment.') }}</p>
        @else
            <div class="row">
                @foreach ($collections['results'] as $collection)
                    @php
                        $slug = $collection['slug'] ?? null;
                        $name = $collection['name'] ?? __('Unnamed Collection');
                        $description = !empty($collection['description']) ? $collection['description'] : __('No description available.');
                    @endphp

                    @if ($slug)
                        <div class="mb-4 col-md-4">
                            <div class="shadow-sm card">
                                <div class="card-body">
                                    <h5 class="card-title">{{ $name }}</h5>
                                    <p class="card-text text-muted">{{ $description }}</p>
                                    <a href="{{ route('store.collection', ['slug' => $slug]) }}" class="btn btn-primary">
                                        View Collection
                                    </a>
                                </div>
                            </div>
                        </div>
                    @endif
                @endforeach
            </div>
        @endif
    </div>
</x-app-layout>