<x-app-layout>
    <div class="container py-6">
        <h1 class="text-2xl font-bold">{{ $product['name'] }}</h1>

        @if(!empty($product['images']))
            <img src="{{ $product['images'][0]['url'] }}" alt="{{ $product['name'] }}" class="w-full max-w-md rounded">
        @endif

        <p class="mt-4">{!! $product['description'] !!}</p>

        @if(!empty($product['variants']))
            <form method="POST" action="{{ route('store.cart.add') }}">
                @csrf
                <input type="hidden" name="product_slug" value="{{ $product['slug'] }}">

                <label for="variant" class="mt-4 font-semibold">Select Variant:</label>
                <select name="variant_id" id="variant" class="mt-2 form-control">
                    @foreach ($product['variants'] as $variant)
                        <option value="{{ $variant['id'] }}">
                            {{ $variant['name'] }} - {{ number_format($variant['unitPrice']['value'], 2) }} {{ $variant['unitPrice']['currency'] }}
                        </option>
                    @endforeach
                </select>

                <label for="quantity" class="mt-4 font-semibold">Quantity:</label>
                <input type="number" name="quantity" id="quantity" value="1" min="1" class="mt-2 form-control">

                <button type="submit" class="mt-4 btn btn-primary">Add to Cart</button>
            </form>
        @else
            <p class="mt-2 text-lg text-gray-500">No available variants.</p>
        @endif
    </div>
</x-app-layout>
