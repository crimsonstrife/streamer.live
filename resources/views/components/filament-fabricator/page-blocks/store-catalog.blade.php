@aware(['page'])
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
    <div class="row">
        <aside class="col-md-3 mb-4">
            <form method="GET">
                <div class="accordion" id="storeFilters">

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
                        @foreach (($filters['category'] ?? []) as $cat)
                            <a href="{{ request()->fullUrlWithQuery(['category' => collect($filters['category'])->reject(fn($c) => $c === $cat)->values()->all()]) }}"
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
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 product-card" data-images="{{ $product->images->count() }}">
                            <div class="position-relative overflow-hidden" style="aspect-ratio: 1/1;">
                                @foreach ($product->images as $i => $image)
                                    <img
                                        src="{{ asset($image->local_path ?? '') ?: $image->url }}"
                                        alt="{{ $image->alt_text ?? $product->name }}"
                                        class="card-img-top product-image position-absolute top-0 start-0 w-100 h-100 object-fit-cover @if($i !== 0) opacity-0 @endif"
                                        data-index="{{ $i }}"
                                        loading="lazy"
                                    >
                                @endforeach
                            </div>
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ $product->name }}</h5>
                                <p class="card-text mb-2">{{ $product->symbol_price }} USD</p>
                                <a href="{{ route('store.product', $product->slug) }}" class="btn btn-primary mt-auto">View</a>
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

