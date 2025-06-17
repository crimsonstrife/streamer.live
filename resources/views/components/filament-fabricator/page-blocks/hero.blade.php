@aware(['page'])
@php
    /** @var \Illuminate\Support\Collection $heroes */
    $first = $heroes->first();
    $blockId = 'section-hero-' . uniqid();
    $full_width   = $first->full_width;
    $wrapperClass = $full_width ? 'hero__container--full' : 'hero__container--regular';
@endphp

<div id="{{ $blockId }}" class="block-section">
    <style>
        /* 1) Aspect‐ratio box */
        .hero--{{ $blockId }} .hero__adapt {
            position: relative;
            overflow: hidden;
        }
        .hero--{{ $blockId }} .hero__adapt::before {
            content: '';
            padding-bottom: 56.25%; /* patched by JS */
            display: block;
        }

        /* 2) Fill box */
        .hero--{{ $blockId }} .section-background__image,
        .hero--{{ $blockId }} .section-background__overlay {
            position: absolute; top:0; left:0;
            width:100%; height:100%;
        }
        .hero--{{ $blockId }} .section-background__image {
            background-size: cover;
            background-position: center;
        }

        /* 3) Layering */
        .hero--{{ $blockId }} .hero__container {
            position: relative;
        }
        .hero--{{ $blockId }} .hero__inner {
            position: absolute; inset:0;
            display: flex; align-items:center; justify-content:center;
            z-index:1;
        }
        .hero--{{ $blockId }} .section-background__adapt,
        .hero--{{ $blockId }} .section-background__image,
        .hero--{{ $blockId }} .section-background__overlay {
            z-index:0;
        }

        /* 4) Content centering */
        .hero--{{ $blockId }} .hero__content.hero__content--center {
            margin:0 auto; padding:0 1rem; text-align:center;
        }
        @media (min-width:768px) {
            .hero--{{ $blockId }} .hero__content.hero__content--center {
                max-width:600px; padding:0;
            }
        }
        .hero__socials-container.hero__socials-container--center {
            padding: 0 10rem;
            text-align: center;
            margin: 5% auto 0;
        }
    </style>

    <section data-section-id="{{ $blockId }}" class="hero hero--{{ $blockId }}">
        <div class="hero__container {{ $wrapperClass }}">
            @if($mode === 'single')
                @php $items = collect([$first]); @endphp
            @else
                @php $items = $heroes; @endphp
                <div id="{{ $blockId }}-carousel" class="carousel slide h-100" data-bs-ride="carousel">
                    <div class="carousel-inner h-100">
                        @endif

                        @foreach($items as $i => $hero)
                            @php $isActive = ($i === 0) ? ' active' : ''; @endphp
                            @php
                                $mediaItems = $hero->getMedia('images');
                            if ($mediaItems->isNotEmpty())
                                {
                                    $image = $mediaItems[0];
                                }
                            else
                                {
                                    $image = null;
                                }
                            @endphp
                            @if($mode === 'carousel')
                                <div class="carousel-item{{ $isActive }} h-100">
                                    @endif

                                    <div class="section-background">
                                        @if(count($mediaItems) > 1)
                                            <div class="section-background__adapt hero__adapt hero__carousel">
                                                <div class="hero__carousel-inner">
                                                    @foreach ($mediaItems as $index => $media)
                                                        <div class="section-background__image hero__carousel-item{{ $index === 0 ? ' is-active' : '' }}" style="background-image:url('{{ $media->getUrl() }}');"></div>
                                                    @endforeach
                                                </div>
                                                <div class="section-background__overlay" style="background-color:rgba(0,0,0,0.5)"></div>
                                                <button class="hero__carousel-prev" aria-label="Previous">&lt;</button>
                                                <button class="hero__carousel-next" aria-label="Next">&gt;</button>
                                            </div>
                                        @else
                                            <div class="section-background__adapt hero__adapt">
                                                <div class="section-background__image" style="background-image:url('{{ $image->getUrl() }}');"></div>
                                                <div class="section-background__overlay" style="background-color:rgba(0,0,0,0.5)"></div>
                                            </div>
                                        @endif
                                    </div>

                                    <div class="hero__inner hero__inner--center">
                                        <div class="container wrapper">
                                            <div class="hero__content hero__content--center" style="color:#fff;">
                                                <h1 class="hero__heading">{{ $hero->title }}</h1>
                                                @if($hero->subtitle)
                                                    <p class="hero__text">{{ $hero->subtitle }}</p>
                                                @endif
                                                <div class="hero__cta-container hero__cta-container--center">
                                                    <div class="hero__cta hero__cta--primary">
                                                        <a href="{{ $hero->primary_cta_url }}" class="btn btn-primary">
                                                            {{ $hero->primary_cta_text }}
                                                        </a>
                                                    </div>
                                                    @if($hero->secondary_cta_text)
                                                        <div class="hero__cta hero__cta--secondary ms-2">
                                                            <a href="{{ $hero->secondary_cta_url }}" class="btn btn-outline-light">
                                                                {{ $hero->secondary_cta_text }}
                                                            </a>
                                                        </div>
                                                    @endif
                                                </div>
                                                <div class="hero__socials-container hero__socials-container--center">
                                                    @if($hero->show_socials)
                                                        @php
                                                            /** @var \App\Settings\SocialSettings $settings */
                                                            $settings = app(\App\Settings\SocialSettings::class);

                                                            // allow caller to override, otherwise default to 5
                                                            $limit = 6;

                                                            // determine the order (saved or fallback)
                                                            $order = $settings->social_display_order;
                                                            if (empty($order)) {
                                                                $order = collect([
                                                                    'twitter','facebook','instagram','linkedin','youtube',
                                                                    'twitch','tiktok','bluesky','kick','threads',
                                                                    'github','gitlab','discord','reddit','mastodon',
                                                                    'pinterest','snapchat','tumblr','medium','dribbble',
                                                                    'behance','stackoverflow','patreon','kofi','soundcloud','spotify',
                                                                ])
                                                                ->filter(fn($key) => filled($settings->{"social_{$key}_" . ($key === 'discord' ? 'invite' : 'handle')}))
                                                                ->toArray();
                                                            }

                                                            // only show up to the requested number
                                                            $order = collect($order)->take($limit)->toArray();
                                                        @endphp

                                                        <ul class="hero__socials list-unstyled d-flex" style="color:#fff;">
                                                            @foreach($order as $key)
                                                                @php
                                                                    $prop   = "social_{$key}_" . ($key === 'discord' ? 'invite' : 'handle');
                                                                    $handle = $settings->{$prop} ?? null;
                                                                    $url    = \App\Utilities\SocialUrlGenerator::url($key, $handle);
                                                                    $key    = ($key === 'twitter' ? 'x-twitter' : $key);
                                                                @endphp

                                                                @if($url)
                                                                    <li class="ms-4 hero__social-item">
                                                                        <a class="link-body-emphasis hero__social-link" href="{{ $url }}" target="_blank" rel="noopener">
                                                                            <x-dynamic-component :component="'fab-'.$key" width="20" height="20" fill="#fff" />
                                                                        </a>
                                                                    </li>
                                                                @endif
                                                            @endforeach
                                                        </ul>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    @if($mode === 'carousel')
                                </div>
                            @endif
                        @endforeach

                        @if($mode === 'carousel')
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#{{ $blockId }}-carousel" data-bs-slide="prev">‹</button>
                    <button class="carousel-control-next" type="button" data-bs-target="#{{ $blockId }}-carousel" data-bs-slide="next">›</button>
                </div>
            @endif
        </div>
    </section>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const blockId  = '{{ $blockId }}';
        const sect     = document.getElementById(blockId);
        const imgUrl   = '{{ $first->background_image_url }}';
        const styleTag = sect.querySelector('style');

        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
            const pct = (img.naturalHeight / img.naturalWidth) * 100;
            styleTag.textContent = styleTag.textContent.replace(
                /padding-bottom:\s*[\d\.]+%/,
                `padding-bottom: ${pct.toFixed(6)}%`
            );
        };
    });
</script>
