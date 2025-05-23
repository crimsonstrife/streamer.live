@aware(['page'])
@php
    /** @var \Illuminate\Support\Collection $heroes */
    $first = $heroes->first();
    $full_width = $first->full_width;
    // Decide whether to wrap in a container or go edge-to-edge
    $wrapperClass = $full_width ? '' : 'container';
@endphp

@if($first)
    <section id="hero-block" class="hero-banner w-100 position-relative d-flex align-items-center justify-content-center"
        style="background-image:url('{{ $first->background_image_url }}'); background-size:cover; background-position:center;"
    >
        <div class="section-background__overlay" style="background-color:#000000;opacity:0.5;"></div>
        @if($mode === 'single')
            <div class="{{ $wrapperClass }} hero-content text-center text-white d-flex flex-column align-items-center justify-content-center h-100">
                <h1>{{ $first->title }}</h1>
                @if(! empty($first->subtitle))
                    <p class="lead">{{ $first->subtitle }}</p>
                @endif
                <a href="{{ $first->primary_cta_url }}" class="btn btn-lg btn-primary">
                    {{ $first->primary_cta_text }}
                </a>
                @if(! empty($first->secondary_cta_text))
                    <a href="{{ $first->secondary_cta_url }}" class="btn btn-lg btn-outline-light ms-2">
                        {{ $first->secondary_cta_text }}
                    </a>
                @endif
            </div>
        @else
            <div id="heroCarousel" class="carousel slide w-100 h-100" data-bs-ride="carousel">
                <div class="carousel-inner h-100">
                    @foreach($heroes as $i => $hero)
                        <div
                            class="carousel-item {{ $i === 0 ? 'active' : '' }} h-100"
                            style="background-image:url('{{ $hero->background_image_url }}'); background-size:cover; background-position:center;"
                        >
                            <div class="{{ $wrapperClass }} hero-content text-center text-white d-flex flex-column align-items-center justify-content-center h-100">
                                <h2>{{ $hero->title }}</h2>
                                @if($hero->subtitle)
                                    <p class="lead">{{ $hero->subtitle }}</p>
                                @endif
                                <a href="{{ $hero->primary_cta_url }}" class="btn btn-primary">
                                    {{ $hero->primary_cta_text }}
                                </a>
                                @if($hero->secondary_cta_text)
                                    <a href="{{ $hero->secondary_cta_url }}" class="btn btn-outline-light ms-2">
                                        {{ $hero->secondary_cta_text }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">‹</button>
                <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">›</button>
            </div>
        @endif
    </section>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const banner = document.getElementById('hero-block');
            if (!banner) return;

            const img = new Image();
            img.src = '{{ $first->background_image_url }}';
            img.onload = () => {
                const ratio = img.naturalHeight / img.naturalWidth;
                const width = banner.clientWidth;
                const maxHeight = 600;
                const calculated = width * ratio;
                banner.style.height = Math.min(calculated, maxHeight) + 'px';
            };
        });
    </script>
@endif
