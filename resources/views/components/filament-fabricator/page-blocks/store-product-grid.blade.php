@php use App\Settings\FourthwallSettings; @endphp
@aware(['page'])
<div class="container py-4">
    @php $settings = app(FourthwallSettings::class); @endphp

    @if (! $settings->enable_integration)
        <div class="alert alert-warning text-center">
            <strong>Store is currently disabled.</strong>
            Please come back later!
        </div>
    @else
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
                            <img src="{!! asset($image->local_path) ?? $image->url !!}" class="card-img-top"
                                 alt="{{ $image->alt_text }}">
                        @endif
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">{{ $product->name }}</h5>
                            @if ($product->review_count > 0)
                                <div class="mb-2">
                                    @for ($i = 1; $i <= 5; $i++)
                                        <i class="bi {{ $i <= round($product->average_rating) ? 'bi-star-fill text-warning' : 'bi-star text-muted' }}"></i>
                                    @endfor
                                    <small class="text-muted ms-2">
                                        {{ number_format($product->average_rating, 1) }}/5
                                        ({{ $product->review_count }} {{ Str::plural('review', $product->review_count) }}
                                        )
                                    </small>
                                </div>
                            @else
                                <div class="mb-2">
                                    <small class="text-muted">No ratings yet</small>
                                </div>
                            @endif
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
    @endif
</div>
