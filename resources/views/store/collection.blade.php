<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight">
            {!! html_entity_decode($collection['name']) !!}
        </h2>
    </x-slot>

    <div class="container py-6">
        <h3 class="mb-4 text-lg font-semibold">
            {{ __('Products in ') }}{!! html_entity_decode($collection['name']) ?? 'this collection' !!}
        </h3>

        @if ($collection->products->isEmpty())
            <p class="text-center text-muted">{{ __('No products available in this collection.') }}</p>
        @else
            <div class="row">
                @foreach ($collection->products as $product)
                    @php
                        $image = $product->images->isNotEmpty()
                            ? asset('storage/' . $product->images->first()->local_path)
                            : asset('images/default-product.png');
                    @endphp
                    <div class="mb-4 col-md-4">
                        <div class="shadow-sm card">
                            <img src="{{ $image }}" class="card-img-top" alt="{!! html_entity_decode($product->name) !!} Image">
                            <div class="card-body">
                                <h5 class="card-title">{!! html_entity_decode($product->name) !!}</h5>
                                <p class="card-text text-muted">
                                    {{ number_format($product->price, 2) }} USD
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
    </div>
</x-app-layout>
