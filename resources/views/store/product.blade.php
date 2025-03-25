<x-app-layout>
    <div class="container py-6">
        <h1 class="text-2xl font-bold">{{ $product->name }}</h1>

        @if ($product->images->isNotEmpty())
            <!-- Main Image Carousel -->
            <div id="productImageCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    @foreach($product->images as $index => $image)
                        <div class="carousel-item @if($index === 0) active @endif">
                            <img src="{!! asset($image->local_path) ?? $image->url !!}" class="d-block w-100" alt="Product Image">
                            @if($image->model_size_worn || $image->model_height_cm || $image->model_description)
                                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                                    @if($image->model_size_worn)
                                        <p><strong>Size Worn:</strong> {{ $image->model_size_worn }}</p>
                                    @endif
                                    @if($image->model_height_cm)
                                        <p><strong>Height:</strong> {{ floor($image->model_height_cm / 30.48) }}'{{ round(fmod($image->model_height_cm / 2.54, 12)) }}" ({{ $image->model_height_cm }} cm)</p>
                                    @endif
                                    @if($image->model_description)
                                        <p>{{ $image->model_description }}</p>
                                    @endif
                                </div>
                            @endif
                        </div>
                    @endforeach
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <!-- Thumbnails -->
            <div class="row mt-3">
                @foreach($product->images as $index => $image)
                    <div class="col-3">
                        <img src="{!! asset($image->local_path) ?? $image->url !!}" class="img-thumbnail" style="cursor:pointer;" onclick="document.querySelector('#productImageCarousel').carousel({{ $index }})" alt="">
                    </div>
                @endforeach
            </div>
        @else
            <img src="{{ asset(config('fourthwall.default_product_image')) }}" alt="No image available" class="img-fluid">
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
    </div>
</x-app-layout>
