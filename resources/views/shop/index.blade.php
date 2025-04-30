@php use App\Settings\FourthwallSettings; @endphp
<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight">
            {{ __('Store') }}
        </h2>
    </x-slot>

    <div class="container py-6">
        @php $settings = app(FourthwallSettings::class); @endphp

        @if (! $settings->enable_integration)
            <div class="alert alert-warning text-center">
                <strong>Store is currently disabled.</strong>
                Please come back later!
            </div>
        @else
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
                                            $product = $collection->products->first();
                                                if ($product->images->isNotEmpty())
                                    {
                                        $image = $product->images->first();
                                    }
                                else
                                    {
                                        $image = null;
                                    }
                                        @endphp
                                        @if ($product->images->isNotEmpty())
                                            <img src="{!! asset($image->local_path) ?? $image->url !!}"
                                                 class="card-img-top" alt="{{ $image->alt_text }}">
                                        @endif
                                    @else
                                        <img src="{{ asset(config('fourthwall.default_product_image')) }}"
                                             alt="Default Image" class="w-full max-w-md rounded">
                                    @endif
                                    <p class="card-text text-muted">{{ $collection->description ?? __('No description available.') }}</p>
                                    <!-- Products Count -->
                                    <p class="card-text text-muted">{{ $collection->products->count() }} {{ __('Products') }}</p>
                                    <!-- View Collection Button -->
                                    <a href="{{ route('store.collection', ['slug' => $collection->slug]) }}"
                                       class="btn btn-primary">
                                        View Collection
                                    </a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        @endif
    </div>
</x-app-layout>
