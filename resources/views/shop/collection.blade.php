@php use App\Settings\FourthwallSettings; @endphp
<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight">
            {{$collection['name'] ?? 'Collection'}}
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
            <h3 class="mb-4 text-lg font-semibold">
                {{ __('Products in ') }}{{$collection->name ?? 'this collection'}}
            </h3>

            @if ($collection->products->isEmpty())
                <p class="text-center text-muted">{{ __('No products available in this collection.') }}</p>
            @else
                <div class="row">
                    @foreach ($collection->products as $product)
                        @php
                            if ($product->images->isNotEmpty())
                                {
                                    $image = $product->images->first();
                                }
                            else
                                {
                                    $image = null;
                                }
                        @endphp
                        <div class="mb-4 col-md-4">
                            <div class="shadow-sm card">
                                @if ($product->images->isNotEmpty())
                                    <img src="{!! asset($image->local_path) ?? $image->url !!}" class="card-img-top"
                                         alt="{{ $image->alt_text }}">
                                @endif
                                <div class="card-body">
                                    <h5 class="card-title">{{ $product->name }}</h5>
                                    <p class="card-text text-muted">
                                        {{ $product->symbol_price }} USD
                                    </p>
                                    <a href="{{ route('store.product', ['slug' => $product->slug]) }}"
                                       class="btn btn-primary">
                                        View Product
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
