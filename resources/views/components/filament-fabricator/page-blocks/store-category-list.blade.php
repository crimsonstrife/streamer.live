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
            @foreach ($categories as $category)
                <div class="col-md-3 mb-3">
                    <a href="{{ route('shop.category', ['slug' => $category->slug]) }}" class="text-decoration-none">
                        <div class="card h-100 text-center p-3">
                            <h5 class="card-title mb-1">{{ $category->name }}</h5>
                            <p class="text-muted small mb-0">
                                {{ $category->products_count }} product{{ $category->products_count !== 1 ? 's' : '' }}
                            </p>
                        </div>
                    </a>
                </div>
            @endforeach
        </div>
    @endif
</div>
