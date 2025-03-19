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
                                <h5 class="card-title">{{$collection['name'] ?? 'Collection'}}</h5>
                                <!-- Image of first product in collection -->
                                @if ($collection->products->isNotEmpty())
                                    @php
                                        $image = $collection->products->first()->images->isNotEmpty()
                                            ? asset('storage/' . $collection->products->first()->images->first()->local_path)
                                            : asset(config('fourthwall.default_product_image'));
                                    @endphp
                                    <img src="{{ $image }}" class="card-img-top" alt="{{ $collection->products->first()->name }} Image">
                                @else
                                    <img src="{{ asset(config('fourthwall.default_product_image')) }}" alt="Default Image" class="w-full max-w-md rounded">
                                @endif
                                <p class="card-text text-muted">{{ $collection->description ?? __('No description available.') }}</p>
                                <!-- Products Count -->
                                <p class="card-text text-muted">{{ $collection->products->count() }} {{ __('Products') }}</p>
                                <!-- View Collection Button -->
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
