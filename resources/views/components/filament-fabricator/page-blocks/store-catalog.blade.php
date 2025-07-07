@php use App\Settings\FourthwallSettings; @endphp
@aware(['page', 'orderPromotions', 'productPromotions'])
@push('styles')
    <style>
        .product-image {
            transition: opacity 0.4s ease-in-out;
            opacity: 0;
            z-index: 0;
        }

        .product-image.opacity-100 {
            opacity: 1 !important;
            z-index: 1;
        }
    </style>
@endpush
<div class="container py-4">
    @php $settings = app(FourthwallSettings::class); @endphp

    @if (! $settings->enable_integration)
        <div class="alert alert-warning text-center">
            <strong>Store is currently disabled.</strong>
            Please come back later!
        </div>
    @else
        {{-- ORDER-WIDE PROMOS --}}
        @if($orderPromotions->isNotEmpty())
            <div class="mb-4">
                @foreach($orderPromotions as $promo)
                    @if($promo->type === 'SHOP_AUTO_APPLYING')
                        <div class="alert alert-info alert-dismissible d-flex align-items-center bg-twitch">
                            <x-fab-twitch class="me-2" width="1rem" />
                            {!! $promo->customer_message !!}
                        </div>
                    @else
                        <div class="alert alert-info alert-dismissible d-flex align-items-center">
                            {!! $promo->customer_message !!}
                        </div>
                    @endif
                @endforeach

            </div>
        @endif
        <div class="row">
            <aside class="col-md-3 mb-4">
                <form method="GET">
                    <div class="accordion" id="storeFilters">
                        {{-- Collections --}}
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingCollection">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseCollection" aria-expanded="true">
                                    Collections
                                </button>
                            </h2>
                            <div id="collapseCollection" class="accordion-collapse collapse show"
                                 data-bs-parent="#storeFilters">
                                <div class="accordion-body">
                                    @foreach ($collections as $collection)
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="collection[]"
                                                   value="{{ $collection->slug }}"
                                                   id="collection_{{ $collection->id }}"
                                                {{ in_array($collection->slug, $filters['collection'] ?? [], true) ? 'checked' : '' }}>
                                            <label class="form-check-label" for="collection_{{ $collection->id }}">
                                                {{ $collection->name }}
                                            </label>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>

                        {{-- Categories --}}
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingCategory">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseCategory" aria-expanded="true">
                                    Categories
                                </button>
                            </h2>
                            <div id="collapseCategory" class="accordion-collapse collapse show"
                                 data-bs-parent="#storeFilters">
                                <div class="accordion-body">
                                    @foreach ($categories as $category)
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="category[]"
                                                   value="{{ $category->slug }}"
                                                   id="category_{{ $category->id }}"
                                                {{ in_array($category->slug, $filters['category'] ?? [], true) ? 'checked' : '' }}>
                                            <label class="form-check-label" for="category_{{ $category->id }}">
                                                {{ $category->name }}
                                            </label>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>

                        {{-- Tags --}}
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTag">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTag">
                                    Tags
                                </button>
                            </h2>
                            <div id="collapseTag" class="accordion-collapse collapse" data-bs-parent="#storeFilters">
                                <div class="accordion-body">
                                    <select name="tag[]" class="form-select" multiple>
                                        @foreach ($tags as $tag)
                                            <option value="{{ $tag->name }}"
                                                    @if(collect($filters['tag'] ?? [])->contains($tag->name)) selected @endif>
                                                {{ $tag->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>

                        {{-- Size --}}
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingSize">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseSize">
                                    Sizes
                                </button>
                            </h2>
                            <div id="collapseSize" class="accordion-collapse collapse" data-bs-parent="#storeFilters">
                                <div class="accordion-body">
                                    <select class="form-select" name="size">
                                        <option value="">All Sizes</option>
                                        @foreach ($sizes as $availableSize)
                                            <option value="{{ $availableSize }}"
                                                {{ ($filters['size'] ?? null) === $availableSize ? 'selected' : '' }}>
                                                {{ ucfirst($availableSize) }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-outline-primary mt-3 w-100" type="submit">Apply Filters</button>
                </form>
            </aside>

            {{-- Product Grid --}}
            <div class="col-md-9">
                @if (!empty(array_filter($filters)))
                    <div class="mb-3">
                        <h6 class="mb-2">Active Filters:</h6>
                        <div class="d-flex flex-wrap gap-2">
                            @foreach (($filters['collection'] ?? []) as $col)
                                <a href="{{ request()->fullUrlWithQuery(['collection' => collect($filters['collection'])->reject(fn($co) => $co === $col)->values()->all()]) }}"
                                   class="badge bg-primary text-white text-decoration-none">
                                    {{ ucfirst($col) }} ×
                                </a>
                            @endforeach

                            @foreach (($filters['category'] ?? []) as $cat)
                                <a href="{{ request()->fullUrlWithQuery(['category' => collect($filters['category'])->reject(fn($ca) => $ca === $cat)->values()->all()]) }}"
                                   class="badge bg-primary text-white text-decoration-none">
                                    {{ ucfirst($cat) }} ×
                                </a>
                            @endforeach

                            @foreach (($filters['tag'] ?? []) as $tag)
                                <a href="{{ request()->fullUrlWithQuery(['tag' => collect($filters['tag'])->reject(fn($t) => $t === $tag)->values()->all()]) }}"
                                   class="badge bg-info text-dark text-decoration-none">
                                    {{ ucfirst($tag) }} ×
                                </a>
                            @endforeach

                            @if (!empty($filters['size']))
                                <a href="{{ request()->fullUrlWithQuery(['size' => null]) }}"
                                   class="badge bg-secondary text-white text-decoration-none">
                                    Size: {{ ucfirst($filters['size']) }} ×
                                </a>
                            @endif

                            <a href="{{ url()->current() }}" class="btn btn-sm btn-link text-danger">Clear all</a>
                        </div>
                    </div>
                @endif

                <div class="row">
                    @forelse ($products as $product)
                        @php
                            // find promos that apply to this item
                            $applied = $productPromotions->filter(fn($p) => $p->products->contains('id', $product->id));
                        @endphp
                        @php $mediaItems = $product->getMedia('images'); @endphp
                        <div class="col-md-4 mb-4">
                            <div class="card h-100 product-card" data-images="{{ $mediaItems->count() }}">
                                <div class="position-relative overflow-hidden" style="aspect-ratio: 1/1;">
                                    @foreach ($mediaItems as $index => $media)
                                        <img
                                            src="{{ $media->getUrl() }}"
                                            alt="{{ $media->getCustomProperty('image_alt_text') ?? 'Product image for '. $product->name }}"
                                            class="card-img-top product-image position-absolute top-0 start-0 w-100 h-100 object-fit-cover @if($index !== 0) opacity-0 @endif"
                                            data-index="{{ $index }}"
                                            loading="lazy"
                                        >
                                    @endforeach
                                </div>
                                <div class="card-body d-flex flex-column">
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
                                    <p class="card-text mb-2">{{ $product->symbol_price }} USD</p>
                                    @foreach($applied as $promo)
                                        @if($promo->type === 'SHOP_AUTO_APPLYING')
                                            <span class="badge badge-twitch me-1 d-inline-flex align-items-center">
                                                <x-fab-twitch class="me-1" style="font-size: 0.9em;" />
                                                {!! $promo->customer_message !!}
                                            </span>
                                        @else
                                            <span class="badge bg-info mb-1">
                                                {!! $promo->customer_message !!}
                                            </span>
                                        @endif
                                    @endforeach
                                    <a href="{{ route('shop.product', ['slug' => $product->slug]) }}"
                                       class="btn btn-primary mt-auto">View</a>
                                </div>
                            </div>

                        </div>
                    @empty
                        <p>No products found.</p>
                    @endforelse
                </div>

                <div class="mt-4">
                    {{ $products->links('vendor.pagination.bootstrap-5') }}
                </div>
            </div>
        </div>
    @endif
</div>
@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const cards = document.querySelectorAll('.product-card');

            cards.forEach(card => {
                const images = card.querySelectorAll('.product-image');
                if (images.length <= 1) return;

                let current = 0;
                let interval = null;

                card.addEventListener('mouseenter', () => {
                    interval = setInterval(() => {
                        images[current].classList.remove('opacity-100');
                        images[current].classList.add('opacity-0');

                        current = (current + 1) % images.length;

                        images[current].classList.remove('opacity-0');
                        images[current].classList.add('opacity-100');
                    }, 1000);
                });

                card.addEventListener('mouseleave', () => {
                    clearInterval(interval);
                    images.forEach((img, i) => {
                        img.classList.toggle('opacity-100', i === 0);
                        img.classList.toggle('opacity-0', i !== 0);
                    });
                    current = 0;
                });
            });
        });
    </script>
@endpush

