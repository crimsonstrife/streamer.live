@php use App\Settings\FourthwallSettings; @endphp
@aware(['product','orderPromotions','productPromotions'])
@php $settings = app(FourthwallSettings::class); @endphp

@if (! $settings->enable_integration)
    <div class="alert alert-warning text-center">
        <strong>Store is currently disabled.</strong>
        Please come back later!
    </div>
@else
    @if ($product)
        @push('styles')
            <style>
                .carousel-item .model-info {
                    transition: opacity 0.3s ease;
                    opacity: 0;
                    pointer-events: none;
                }

                .carousel-item:hover .model-info {
                    opacity: 1;
                    pointer-events: auto;
                }

                .carousel-item .info-badge {
                    font-size: clamp(1rem, 2.5vw, 2rem); /* scales between 1rem and 2rem */
                    padding: 0.4em;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                    z-index: 5;
                    line-height: 1;
                }

                .carousel-item:hover .info-badge {
                    opacity: 1;
                }

                .max-product-width {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .thumbnail-column {
                    gap: 0.5rem;
                    overflow: hidden !important;
                    width: 5rem;
                }

                .thumbnail-column #thumbnailContainer img {
                    width: 4rem;
                    height: auto;
                    object-fit: cover;
                    border: 2px solid transparent;
                    transition: border 0.2s ease-in-out;
                    flex-shrink: 0;
                }

                #thumbnailContainer {
                    display: inline-flex;
                    flex-direction: column;
                    max-height: 600px;
                    width: 3rem;
                    overflow: hidden !important;
                    position: relative;
                }

                @media only screen and (max-width: 600px) {
                    .thumbnail-column {
                        width: 100% !important;
                        flex-wrap: nowrap;
                        overflow: hidden !important;
                    }

                    #thumbnailContainer {
                        margin-right: 0;
                        flex-direction: row;
                        overflow: hidden !important;
                        width: 100% !important;
                    }
                }

                .thumbnail-column img:hover {
                    border-color: #0d6efd;
                }

                #thumbnailContainer {
                    max-height: 600px;
                    width: 3rem;
                    position: relative;
                    overflow: hidden !important;
                }

                .carousel.vertical .carousel-inner {
                    display: flex;
                    flex-direction: column;
                    height: 600px; /* Or whatever fits your layout */
                    overflow: hidden;
                    position: relative;
                }

                .carousel.vertical .carousel-item {
                    transition: transform 0.6s ease-in-out;
                    flex: 0 0 100%;
                    max-height: 600px;
                }

                .carousel.vertical .carousel-item-next.carousel-item-left,
                .carousel.vertical .carousel-item-prev.carousel-item-right {
                    transform: translateX(-100%);
                }

                .carousel.vertical .active.carousel-item-left {
                    transform: translateX(100%);
                }

                .carousel.vertical .active.carousel-item-right {
                    transform: translateX(-100%);
                }
            </style>
        @endpush
        <style>
            .carousel-item .model-info {
                transition: opacity 0.3s ease;
                opacity: 0;
                pointer-events: none;
            }

            .carousel-item:hover .model-info {
                opacity: 1;
                pointer-events: auto;
            }

            .carousel-item .info-badge {
                font-size: clamp(1rem, 2.5vw, 2rem); /* scales between 1rem and 2rem */
                padding: 0.4em;
                opacity: 0.8;
                transition: opacity 0.2s;
                z-index: 5;
                line-height: 1;
            }

            .carousel-item:hover .info-badge {
                opacity: 1;
            }

            .max-product-width {
                max-width: 800px;
                margin: 0 auto;
            }

            .thumbnail-column {
                gap: 0.5rem;
                overflow: hidden !important;
                width: 5rem;
            }

            .thumbnail-column #thumbnailContainer img {
                width: 4rem;
                height: auto;
                object-fit: cover;
                border: 2px solid transparent;
                transition: border 0.2s ease-in-out;
                flex-shrink: 0;
            }

            #thumbnailContainer {
                display: inline-flex;
                flex-direction: column;
                max-height: 600px;
                width: 3rem;
                position: relative;
                overflow: hidden !important;
            }

            @media only screen and (max-width: 600px) {
                .thumbnail-column {
                    width: 100% !important;
                    max-height: none !important;
                    flex-wrap: nowrap;
                    overflow: hidden !important;
                }

                #thumbnailContainer {
                    margin-right: 0;
                    flex-direction: row;
                    width: 100% !important;
                }
            }

            .thumbnail-column img:hover {
                border-color: #0d6efd;
            }

            #thumbnailContainer {
                max-height: 600px;
                width: 3rem;
                position: relative;
                overflow: hidden !important;
            }

            .carousel.vertical .carousel-inner {
                display: flex;
                flex-direction: column;
                height: 600px; /* Or whatever fits your layout */
                overflow: hidden;
                position: relative;
            }

            .carousel.vertical .carousel-item {
                transition: transform 0.6s ease-in-out;
                flex: 0 0 100%;
                max-height: 600px;
            }

            .carousel.vertical .carousel-item-next.carousel-item-left,
            .carousel.vertical .carousel-item-prev.carousel-item-right {
                transform: translateX(-100%);
            }

            .carousel.vertical .active.carousel-item-left {
                transform: translateX(100%);
            }

            .carousel.vertical .active.carousel-item-right {
                transform: translateX(-100%);
            }
        </style>
        @php $mediaItems = $product->getMedia('images'); @endphp
        <div class="container py-4">
            @include('shop.partials.promo-banner')
            <div class="row">
                <div class="col-md-6">
                    @if ($mediaItems->isNotEmpty())
                        <!-- Main Image Carousel -->
                        <div class="d-flex flex-column flex-md-row justify-content-center align-items-start gap-3">
                        <!-- Thumbnail Column -->
                            <div class="thumbnail-column d-flex flex-md-column flex-row overflow-auto align-items-center justify-content-md-start justify-content-between">
                                <!-- Carousel Prev Button -->
                                <button class="btn btn-outline-secondary mb-2 d-none d-md-block" onclick="navigateCarousel('prev')">
                                    <x-fas-chevron-up height="1rem" width="1rem" />
                                </button>

                                <!-- Scrollable Thumbnails -->
                                <div id="thumbnailContainer" class="overflow-auto">
                                    @if ($mediaItems->isNotEmpty() && count($mediaItems) > 1)
                                        @foreach($mediaItems as $index => $media)
                                            <img
                                                src="{{ $media->getUrl() }}"
                                                class="img-thumbnail mb-4 @if($index === 0) border-primary @endif"
                                                data-thumb-index="{{ $index }}"
                                                style="cursor:pointer;"
                                                onclick="goToSlide({{ $index }})"
                                                alt="{{ $media->getCustomProperty('image_alt_text') ?? 'Product image' }}">
                                        @endforeach
                                    @endif
                                </div>

                                <!-- Carousel Next Button -->
                                <button class="btn btn-outline-secondary mt-2 d-none d-md-block" onclick="navigateCarousel('next')">
                                    <x-fas-chevron-down height="1rem" width="1rem" />
                                </button>
                            </div>

                            <!-- Main Carousel -->
                            <div class="col-12 col-md-8">
                                <div id="productImageCarousel" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        @foreach($mediaItems as $index => $media)
                                            <div class="carousel-item @if($index === 0) active @endif">
                                                <div class="position-relative">
                                                    <img src="{{ $media->getUrl() }}" class="img-fluid rounded shadow"
                                                         alt="{{ $media->getCustomProperty('image_alt_text') ?? 'Product image' }}">
                                                    @php
                                                        $modelName = $media->getCustomProperty('model_name') ?? null;
                                                        $modelSize = $media->getCustomProperty('model_size_worn') ?? null;
                                                        $modelHeight = $media->getCustomProperty('model_height_cm') ?? null;
                                                        $modelDescription = $media->getCustomProperty('model_description') ?? null;
                                                    @endphp
                                                    @if($modelName || $modelSize || $modelHeight || $modelDescription)
                                                        <span
                                                            class="info-badge position-absolute top-0 end-0 m-2 p-2 bg-dark bg-opacity-75 text-white rounded-circle"
                                                            title="Model info"
                                                            role="button"
                                                            data-info-id="info-{{ $loop->index }}"
                                                            onclick="toggleModelInfo(this)">
                                                <x-fas-circle-info height="1rem" width="auto"/>
                                            </span>
                                                        <div id="info-{{ $loop->index }}"
                                                             class="model-info position-absolute bottom-0 start-0 w-100 p-3 bg-dark bg-opacity-75 text-white rounded-top d-none">
                                                            @if($modelName)
                                                                <p class="mb-1">
                                                                    <strong>Model:</strong> {{ $modelName }}</p>
                                                            @endif
                                                            @if($modelSize)
                                                                <p class="mb-1"><strong>Size
                                                                        Worn:</strong> {{ $modelSize }}</p>
                                                            @endif
                                                            @if($modelHeight)
                                                                <p class="mb-1">
                                                                    <strong>Height:</strong> {{ floor($modelHeight / 30.48) }}
                                                                    '{{ round(fmod($modelHeight / 2.54, 12)) }}
                                                                    "
                                                                    ({{ $modelHeight }} cm)</p>
                                                            @endif
                                                            @if($modelDescription)
                                                                <p class="mb-0">{{ $modelDescription }}</p>
                                                            @endif
                                                        </div>
                                                    @endif
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                    @else
                        <img src="{{ asset(config('fourthwall.default_product_image')) }}" alt="No image available"
                             class="img-fluid">
                    @endif
                </div>
                <div class="col-md-6">
                    <h2>{{ $product->name }}</h2>

                    @if ($product->review_count > 0)
                        <div class="mb-2 d-flex align-items-center">
                            @for ($i = 1; $i <= 5; $i++)
                                @if ($product->average_rating >= $i)
                                    <x-fas-star class="text-warning" height="1rem" width="auto"/>
                                @elseif ($product->average_rating >= $i - 0.5)
                                    <x-fas-star-half-stroke class="text-warning" height="1rem" width="auto"/>
                                @else
                                    <x-far-star class="text-muted" height="1rem" width="auto"/>
                                @endif
                            @endfor

                            <small class="text-muted ms-2">
                                {{ number_format($product->average_rating, 1) }}/5
                                ({{ $product->review_count }} {{ Str::plural('review', $product->review_count) }})
                            </small>
                        </div>
                    @else
                        <div class="mb-2">
                            <small class="text-muted">No ratings yet</small>
                        </div>
                    @endif

                    <p class="text-muted">{{ $product->symbol_price }} USD</p>

                    @include('shop.partials.promo-badge', ['product' => $product])

                    <div class="mb-3">
                        {!! $product->description !!}
                    </div>
                    @php
                        $shopPrefix =  App\Utilities\ShopHelper::getShopSlug();
                    @endphp
                    <form method="POST" action="{{ route($shopPrefix . '.cart.add') }}">
                        @csrf
                        <input type="hidden" name="product_id" value="{{ $product->id }}">

                        {{-- Variant Selector --}}
                        @if ($product->variants->count() > 1)
                            <div class="mb-3">
                                <label for="variant_id" class="form-label">Select Variant</label>
                                <select name="variant_id" class="form-select" required>
                                    @foreach ($product->variants as $variant)
                                        <option value="{{ $variant->provider_id }}">
                                            {{ $variant->name }} - {{ $variant->symbol_price }} USD
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        @else
                            <input type="hidden" name="variant_id"
                                   value="{{ $product->variants->first()?->provider_id }}">
                        @endif

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary">
                                Add to Cart
                            </button>
                        </div>
                    </form>
                    @if ($product->more_details || $product->product_information)
                        <div class="accordion mt-5" id="productDetailsAccordion">
                            @if ($product->more_details)
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingDetails">
                                        <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseDetails" aria-expanded="false"
                                                aria-controls="collapseDetails">
                                            More Details
                                        </button>
                                    </h2>
                                    <div id="collapseDetails" class="accordion-collapse collapse"
                                         aria-labelledby="headingDetails" data-bs-parent="#productDetailsAccordion">
                                        <div class="accordion-body">
                                            {!! $product->more_details !!}
                                        </div>
                                    </div>
                                </div>
                            @endif
                            @if ($product->product_information)
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingInfo">
                                        <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseInfo" aria-expanded="false"
                                                aria-controls="collapseInfo">
                                            Product Information
                                        </button>
                                    </h2>
                                    <div id="collapseInfo" class="accordion-collapse collapse"
                                         aria-labelledby="headingInfo"
                                         data-bs-parent="#productDetailsAccordion">
                                        <div class="accordion-body">
                                            {!! $product->product_information !!}
                                        </div>
                                    </div>
                                </div>
                            @endif
                        </div>
                    @endif
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="mt-5">
                        <h4>Customer Reviews ({{ $product->reviews->count() }})</h4>
                        @if ($product->review_count > 0)
                            <div class="mt-5">
                                <h4>Rating Summary</h4>
                                <div class="mb-3">
                                    <strong class="fs-4">{{ number_format($product->average_rating, 1) }}/5</strong>
                                    <div>
                                        @for ($i = 1; $i <= 5; $i++)
                                            @if ($product->average_rating >= $i)
                                                <x-fas-star class="text-warning" height="1rem" width="auto"/>
                                            @elseif ($product->average_rating >= $i - 0.5)
                                                <x-fas-star-half-stroke class="text-warning" height="1rem"
                                                                        width="auto"/>
                                            @else
                                                <x-far-star class="text-muted" height="1rem" width="auto"/>
                                            @endif
                                        @endfor
                                    </div>
                                    <small class="text-muted">{{ $product->review_count }}
                                        total {{ Str::plural('review', $product->review_count) }}</small>
                                </div>

                                @php
                                    $ratings = collect([5, 4, 3, 2, 1])->mapWithKeys(function ($star) use ($product) {
                                        $total = $product->reviews->where('rating', $star);
                                        return [
                                            $star => [
                                                'total' => $total->count(),
                                                'verified' => $total->where('is_verified', true)->count(),
                                            ],
                                        ];
                                    });
                                @endphp

                                @foreach ($ratings as $star => $data)
                                    <div class="d-flex align-items-center mb-2">
                                        <div class="me-2" style="width: 40px;">{{ $star }}★</div>
                                        <div class="progress flex-grow-1 me-2" style="height: 10px;">
                                            <div class="progress-bar bg-warning" role="progressbar"
                                                 style="width: {{ ($data['total'] / max($product->review_count, 1)) * 100 }}%;"
                                                 aria-valuenow="{{ $data['total'] }}"
                                                 aria-valuemin="0"
                                                 aria-valuemax="{{ $product->review_count }}">
                                            </div>
                                        </div>
                                        <small class="text-muted">
                                            {{ $data['total'] }} <span class="text-success">({{ $data['verified'] }} verified)</span>
                                        </small>
                                    </div>
                                @endforeach
                            </div>
                        @endif

                        @if ($product->reviews->count())
                            @foreach ($product->reviews->sortByDesc('created_at') as $review)
                                <div class="border rounded p-3 mb-3 @if($review->is_verified) border-success @endif">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <strong>{{ $review->user?->name ?? 'Anonymous' }}</strong>
                                        <small class="text-muted">{{ $review->created_at->diffForHumans() }}</small>
                                    </div>
                                    <div class="mb-2">
                                        @for ($i = 1; $i <= 5; $i++)
                                            <i class="bi @if($i <= $review->rating) bi-star-fill text-warning @else bi-star text-muted @endif"></i>
                                        @endfor
                                    </div>
                                    <p class="mb-1">{{ $review->review }}</p>
                                    @if ($review->is_verified)
                                        <span class="badge bg-success">Verified Purchase</span>
                                    @endif
                                </div>
                            @endforeach
                        @else
                            <div class="alert alert-info mt-3">
                                There are no reviews yet. Be the first to leave one!
                            </div>
                        @endif
                    </div>
                </div>
                <div class="col-md-6">
                    @auth
                        <div class="mt-4">
                            <h5>Leave a Review</h5>
                            <form method="POST" action="{{ route('product.review.submit', $product) }}">
                                @csrf
                                <div class="mb-3">
                                    <label for="rating" class="form-label">Rating</label>
                                    <select name="rating" class="form-select" required>
                                        @for ($i = 5; $i >= 1; $i--)
                                            <option value="{{ $i }}">{{ $i }} Star{{ $i > 1 ? 's' : '' }}</option>
                                        @endfor
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="review" class="form-label" style="position: relative;">Your
                                        Review</label>
                                    <x-content-editor id="reviewMessage" name="review" class="form-control w-100"
                                                      rows="3"/>
                                </div>
                                <x-button>
                                    {{ __('Submit Review') }}
                                </x-button>
                                <x-secondary-button>
                                    {{ __('Cancel') }}
                                </x-secondary-button>
                            </form>
                        </div>
                    @endauth
                </div>
            </div>
        </div>
        @push('scripts')
            <script>
                document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
                    new bootstrap.Tooltip(el);
                });

                function toggleModelInfo(el) {
                    const id = el.getAttribute('data-info-id');
                    const infoPanel = document.getElementById(id);

                    document.querySelectorAll('.model-info').forEach(panel => {
                        if (panel !== infoPanel) {
                            panel.classList.add('d-none');
                        }
                    });

                    infoPanel?.classList.toggle('d-none');
                }

                // Highlight active thumbnail on slide
                const carousel = document.querySelector('#productImageCarousel');
                const thumbnails = document.querySelectorAll('[data-thumb-index]');

                carousel.addEventListener('slid.bs.carousel', function (event) {
                    const activeIndex = event.to;
                    thumbnails.forEach(img => {
                        img.classList.remove('border-primary');
                        if (parseInt(img.dataset.thumbIndex) === activeIndex) {
                            img.classList.add('border-primary');
                            img.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                        }
                    });
                });

                function navigateCarousel(direction) {
                    const carouselElement = document.querySelector('#productImageCarousel');
                    const instance = bootstrap.Carousel.getInstance(carouselElement) || new bootstrap.Carousel(carouselElement);
                    if (direction === 'prev') {
                        instance.prev();
                    } else {
                        instance.next();
                    }
                }

                function goToSlide(index) {
                    const carouselElement = document.querySelector('#productImageCarousel');
                    const carousel = bootstrap.Carousel.getInstance(carouselElement) || new bootstrap.Carousel(carouselElement);
                    carousel.to(index);
                }
            </script>
        @endpush
    @else
        <div class="alert alert-warning container my-4">
            Product information not available.
        </div>
    @endif
@endif
