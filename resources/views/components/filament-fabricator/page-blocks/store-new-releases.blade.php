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
            @foreach ($products as $product)
                @php
                    $mediaItems = $product->getMedia('images');
                    if ($mediaItems->isNotEmpty())
                        {
                            $image = $mediaItems[0];
                        }
                    else
                        {
                            $image = null;
                        }
                @endphp
                <div class="mb-4 col-md-4">
                    <div class="card h-100 product-card">
                        @if ($mediaItems->isNotEmpty())
                            <img src="{!! $image->getUrl() !!}" class="card-img-top"
                                 alt="{{ $image->getCustomProperty('image_alt_text') }}">
                        @endif
                        <div class="card-body">
                            <h5 class="card-title">{{ $product->name }}</h5>
                            @if ($product->review_count > 0)
                                <div class="mb-2">
                                    @for ($i = 1; $i <= 5; $i++)
                                        @if ($product->average_rating >= $i)
                                            <x-fas-star class="text-warning" height="1rem" width="auto" />
                                        @elseif ($product->average_rating >= $i - 0.5)
                                            <x-fas-star-half-stroke class="text-warning" height="1rem" width="auto"  />
                                        @else
                                            <x-far-star class="text-muted" height="1rem" width="auto"  />
                                        @endif
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
                            @include('shop.partials.promo-badge', ['product' => $product])
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
