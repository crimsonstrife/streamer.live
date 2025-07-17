@php use App\Settings\FourthwallSettings; @endphp
@aware(['page','orderPromotions','productPromotions'])
@php $settings = app(FourthwallSettings::class); @endphp

@if (! $settings->enable_integration)
    <div class="alert alert-warning text-center">
        <strong>Store is currently disabled.</strong>
        Please come back later!
    </div>
@else
    @if (! $product)
        <div class="alert alert-warning">
            Related products block requires a product context.
        </div>
    @elseif ($related->isEmpty())
        <div class="alert alert-info mt-4">
            No related products found for <strong>{{ $product->name }}</strong>.
        </div>
    @else
        <div class="mt-5">
            <h4>Related Products</h4>
            <div class="row">
                @foreach ($related as $relatedProduct)
                    @php
                        $mediaItems = $relatedProduct->getMedia('images');
                    if ($mediaItems->isNotEmpty())
                        {
                            $image = $mediaItems[0];
                        }
                    else
                        {
                            $image = null;
                        }
                    @endphp
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 product-card">
                            @if ($mediaItems->isNotEmpty())
                                <img src="{!! $image->getUrl() !!}" class="card-img-top"
                                     alt="{{ $image->getCustomProperty('image_alt_text') }}">
                            @endif
                            <div class="card-body">
                                <h5 class="card-title">{{ $relatedProduct->name }}</h5>
                                @if ($relatedProduct->review_count > 0)
                                    <div class="mb-2">
                                        @for ($i = 1; $i <= 5; $i++)
                                            @if ($relatedProduct->average_rating >= $i)
                                                <x-fas-star class="text-warning" height="1rem" width="auto" />
                                            @elseif ($relatedProduct->average_rating >= $i - 0.5)
                                                <x-fas-star-half-stroke class="text-warning" height="1rem" width="auto"  />
                                            @else
                                                <x-far-star class="text-muted" height="1rem" width="auto"  />
                                            @endif
                                        @endfor
                                        <small class="text-muted ms-2">
                                            {{ number_format($relatedProduct->average_rating, 1) }}/5
                                            ({{ $relatedProduct->review_count }} {{ Str::plural('review', $relatedProduct->review_count) }}
                                            )
                                        </small>
                                    </div>
                                @else
                                    <div class="mb-2">
                                        <small class="text-muted">No ratings yet</small>
                                    </div>
                                @endif
                                <p class="text-muted">{{ $relatedProduct->symbol_price }} USD</p>
                                @include('shop.partials.promo-badge', ['product' => $relatedProduct])
                                <a href="{{ url('shop/product/' . $relatedProduct->slug) }}"
                                   class="btn btn-sm btn-outline-primary">
                                    View Product
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif
@endif

