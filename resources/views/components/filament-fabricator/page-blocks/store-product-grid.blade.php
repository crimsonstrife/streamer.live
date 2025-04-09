@aware(['page'])
<div class="container py-4">
    <h2 class="mb-4">{{ $title }}</h2>
    <div class="row">
        @foreach($products as $product)
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
            <div class="col-md-3 mb-4">
                <div class="card h-100">
                    @if ($product->images->isNotEmpty())
                        <img src="{!! asset($image->local_path) ?? $image->url !!}" class="card-img-top" alt="{{ $image->alt_text }}">
                    @endif
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ $product->name }}</h5>
                        <p class="card-text text-muted">
                            {{ $product->symbol_price }} USD
                        </p>
                        <a href="{{ route('shop.product', ['slug' => $product->slug]) }}"
                           class="btn btn-primary">
                            View Product
                        </a>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
