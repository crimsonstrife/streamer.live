@php use App\Settings\FourthwallSettings; @endphp
<x-app-layout>
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
                max-height: 400px;
            }

            .thumbnail-column img {
                border: 2px solid transparent;
                transition: border 0.2s ease-in-out;
            }

            .thumbnail-column img:hover {
                border-color: #0d6efd;
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
                transform: translateY(-100%);
            }

            .carousel.vertical .active.carousel-item-left {
                transform: translateY(100%);
            }

            .carousel.vertical .active.carousel-item-right {
                transform: translateY(-100%);
            }
        </style>
    @endpush
    <div class="container py-6">
        @php $settings = app(FourthwallSettings::class); @endphp

        @if (! $settings->enable_integration)
            <div class="alert alert-warning text-center">
                <strong>Store is currently disabled.</strong>
                Please come back later!
            </div>
        @else
            <h1 class="text-2xl font-bold">{{ $product->name }}</h1>
            @if ($product->images->isNotEmpty())
                <!-- Main Image Carousel -->
                <div class="row justify-content-center">
                    <!-- Thumbnail Column -->
                    <div class="col-auto col-sm-2 col-md-2 col-lg-1">
                        <!-- Carousel Prev Button (moved here) -->
                        <button class="btn btn-outline-secondary mb-2" onclick="navigateCarousel('prev')">
                            <i class="bi bi-chevron-up"></i>
                        </button>

                        <!-- Scrollable Thumbnails -->
                        <div id="thumbnailContainer" class="overflow-auto" style="max-height: 400px;">
                            @foreach($product->images as $index => $image)
                                <img
                                    src="{!! asset($image->local_path) ?? $image->url !!}"
                                    class="img-thumbnail mb-2 @if($index === 0) border-primary @endif"
                                    data-thumb-index="{{ $index }}"
                                    style="cursor:pointer;"
                                    onclick="goToSlide({{ $index }})"
                                    alt="{{ $image->alt_text }}">
                            @endforeach
                        </div>

                        <!-- Carousel Next Button (moved here) -->
                        <button class="btn btn-outline-secondary mt-2" onclick="navigateCarousel('next')">
                            <i class="bi bi-chevron-down"></i>
                        </button>
                    </div>

                    <!-- Main Carousel -->
                    <div class="col-12 col-md-8">
                        <div id="productImageCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                @foreach($product->images as $index => $image)
                                    <div class="carousel-item @if($index === 0) active @endif">
                                        <div class="position-relative">
                                            <img src="{!! asset($image->local_path) ?? $image->url !!}"
                                                 class="img-fluid rounded shadow" alt="{{ $image->alt_text }}">
                                            @if($image->model_name || $image->model_size_worn || $image->model_height_cm || $image->model_description)
                                                <span
                                                    class="info-badge position-absolute top-0 end-0 m-2 p-2 bg-dark bg-opacity-75 text-white rounded-circle"
                                                    title="Model info"
                                                    role="button"
                                                    data-info-id="info-{{ $loop->index }}"
                                                    onclick="toggleModelInfo(this)">
                                                <i class="bi bi-info-circle"></i>
                                            </span>
                                                <div id="info-{{ $loop->index }}"
                                                     class="model-info position-absolute bottom-0 start-0 w-100 p-3 bg-dark bg-opacity-75 text-white rounded-top d-none">
                                                    @if($image->model_name)
                                                        <p class="mb-1"><strong>Model:</strong> {{ $image->model_name }}
                                                        </p>
                                                    @endif
                                                    @if($image->model_size_worn)
                                                        <p class="mb-1"><strong>Size
                                                                Worn:</strong> {{ $image->model_size_worn }}</p>
                                                    @endif
                                                    @if($image->model_height_cm)
                                                        <p class="mb-1">
                                                            <strong>Height:</strong> {{ floor($image->model_height_cm / 30.48) }}
                                                            '{{ round(fmod($image->model_height_cm / 2.54, 12)) }}"
                                                            ({{ $image->model_height_cm }} cm)</p>
                                                    @endif
                                                    @if($image->model_description)
                                                        <p class="mb-0">{{ $image->model_description }}</p>
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

            <p class="mt-4">{{ htmlspecialchars_decode($product->description) }}</p>

            @if ($product->variants->isNotEmpty())
                <form method="POST" action="{{ route('store.cart.add') }}">
                    @csrf
                    <input type="hidden" name="product_id" value="{{ $product->id }}">

                    <label for="variant" class="mt-4 font-semibold">Select Variant:</label>
                    <select name="variant_id" id="variant" class="mt-2 form-control">
                        @foreach ($product->variants as $variant)
                            <option value="{{ $variant->provider_id }}">
                                {{ $variant->name }} - {{ $variant->formatted_price }}
                            </option>
                        @endforeach
                    </select>

                    <label for="quantity" class="mt-4 font-semibold">Quantity:</label>
                    <input type="number" name="quantity" id="quantity" value="1" min="1"
                           class="mt-2 form-control">

                    <button type="submit" class="mt-4 btn btn-primary">Add to Cart</button>
                </form>
            @else
                <p class="mt-2 text-lg text-gray-500">No available variants.</p>
            @endif
        @endif
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
</x-app-layout>
