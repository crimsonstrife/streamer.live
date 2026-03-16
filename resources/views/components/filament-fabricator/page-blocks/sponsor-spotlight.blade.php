@aware(['page'])

@php
    /** @var \App\Models\SharedObjects\BrandPartner|null $partner */
    $partner = $partner ?? null;
    $showExcerpt = (bool) ($show_excerpt ?? true);
    $showBody = (bool) ($show_body ?? true);
    $showCta = (bool) ($show_cta ?? true);
    $showDisclosure = (bool) ($show_disclosure ?? true);
    $useBannerImage = (bool) ($use_banner_image ?? true);
@endphp

@if ($partner)
    @php $primaryLink = $partner->primary_link; @endphp

    <section class="py-4 sponsor-spotlight-block">
        <div class="container-fluid">
            <div class="card shadow-sm overflow-hidden">
                @if ($useBannerImage && $partner->banner_url)
                    <img
                        src="{{ $partner->banner_url }}"
                        alt="{{ $partner->name }} banner"
                        class="card-img-top"
                        style="max-height: 280px; object-fit: cover;"
                    >
                @endif

                <div class="card-body p-4">
                    <div class="row g-4 align-items-center">
                        <div class="col-12 col-lg-4 text-center">
                            @if ($partner->logo_url)
                                <img
                                    src="{{ $partner->logo_url }}"
                                    alt="{{ $partner->name }} logo"
                                    class="img-fluid"
                                    style="max-height: 140px; object-fit: contain;"
                                >
                            @endif
                        </div>

                        <div class="col-12 col-lg-8">
                            <div class="d-flex align-items-center gap-2 flex-wrap mb-3">
                                <h2 class="h3 mb-0">
                                    {{ $title ?: $partner->headline ?: $partner->name }}
                                </h2>

                                @if ($partner->badge)
                                    <span class="badge text-bg-secondary">{{ $partner->badge }}</span>
                                @endif
                            </div>

                            @if ($showExcerpt && $partner->excerpt)
                                <p class="lead">
                                    {{ strip_tags($partner->excerpt) }}
                                </p>
                            @endif

                            @if ($showBody && $partner->body)
                                <div class="mb-3">
                                    {!! $partner->body !!}
                                </div>
                            @endif

                            @if ($showCta && $primaryLink)
                                <a
                                    href="{{ $primaryLink->url }}"
                                    class="btn btn-primary"
                                    target="{{ $primaryLink->target }}"
                                    rel="{{ $primaryLink->rel }}"
                                >
                                    {{ $primaryLink->effective_button_text }}
                                </a>
                            @endif

                            @if ($showDisclosure && $partner->effective_disclosure_text)
                                <p class="small text-body-secondary mb-0 mt-3">
                                    {{ $partner->effective_disclosure_text }}
                                </p>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endif
