<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight">
            {{ $collection['name'] ?? 'Collection' }}
        </h2>
    </x-slot>

    <div class="container py-6">
        <h3 class="mb-4 text-lg font-semibold">{{ __('Products in ') }}{{ $collection['name'] ?? 'this collection' }}</h3>

        @if (empty($products))
            <p class="text-center text-muted">{{ __('No products available in this collection.') }}</p>
        @else
            <div class="row">
                @foreach ($products as $product)
                    @php
                        $name = $product['name'] ?? __('Unnamed Product');
                        $productSlug = $product['slug'] ?? null;
                        $description = $product['description'] ?? 'No description available.';
                        $image = $product['images'][0]['url'] ?? 'https://via.placeholder.com/300';
                        $price = $product['variants'][0]['unitPrice']['value'] ?? null;
                        $currency = $product['variants'][0]['unitPrice']['currency'] ?? 'USD';
                    @endphp

                    @if ($productSlug)
                        <div class="mb-4 col-md-4">
                            <div class="shadow-sm card">
                                <img src="{{ $image }}" class="card-img-top" alt="{{ $name }}">
                                <div class="card-body">
                                    <h5 class="card-title">{{ $name }}</h5>
                                    <p class="card-text text-muted">
                                        {{ $price ? number_format($price, 2) . " " . $currency : __('Price unavailable') }}
                                    </p>
                                    <a href="{{ route('store.product', ['slug' => $productSlug]) }}" class="btn btn-primary">
                                        View Product
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