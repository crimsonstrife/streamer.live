@aware(['product'])

@if ($product)
    <div class="container py-4">
        <div class="row">
            <div class="col-md-6">
                @if ($product->images->isNotEmpty())
                    <img src="{{ asset($product->images->first()->local_path ?? $product->images->first()->url) }}"
                         class="img-fluid rounded mb-3"
                         alt="{{ $product->images->first()->alt_text }}">
                @endif
            </div>
            <div class="col-md-6">
                <h2>{{ $product->name }}</h2>

                <p class="text-muted">{{ $product->symbol_price }} USD</p>

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
                                    <option value="{{ $variant->id }}">
                                        {{ $variant->name }} - {{ $variant->symbol_price }} USD
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    @else
                        <input type="hidden" name="variant_id" value="{{ $product->variants->first()?->id }}">
                    @endif

                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">
                            Add to Cart
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@else
    <div class="alert alert-warning container my-4">
        Product information not available.
    </div>
@endif
