@aware(['page'])
@php
    /** @var \Illuminate\Support\Collection $heroes */
    $first = $heroes->first();
@endphp

@if($mode === 'single')
    @if($first)
        <section class="hero-banner" style="background-image:url('{{ $first->background_image_url }}')">
            <div class="hero-content text-center text-white">
                <h1>{{ $first->title }}</h1>
                @if($first->subtitle)
                    <p class="lead">{{ $first->subtitle }}</p>
                @endif
                <a href="{{ $first->primary_cta_url }}" class="btn btn-lg btn-primary">
                    {{ $first->primary_cta_text }}
                </a>
                @if($first->secondary_cta_text)
                    <a href="{{ $first->secondary_cta_url }}" class="btn btn-lg btn-outline-light ms-2">
                        {{ $first->secondary_cta_text }}
                    </a>
                @endif
            </div>
        </section>
    @endif
@else
    <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            @foreach($heroes as $i => $hero)
                <div class="carousel-item {{ $i === 0 ? 'active' : '' }}"
                     style="background-image:url('{{ $hero->background_image_url }}')">
                    <div class="hero-content text-center text-white">
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
