@aware(['page'])

@php
    $partners = collect($partners ?? []);
    $layout = $layout ?? 'cards';
    $showExcerpt = (bool) ($show_excerpt ?? true);
    $showCta = (bool) ($show_cta ?? true);
    $showDisclosure = (bool) ($show_disclosure ?? true);

    $columns = (int) ($columns ?? 3);
    $colClass = match ($columns) {
        2 => 'col-12 col-md-6',
        4 => 'col-12 col-sm-6 col-lg-3',
        default => 'col-12 col-md-4',
    };
@endphp

@if ($partners->isNotEmpty())
    <section class="py-4 brand-partners-block">
        <div class="container-fluid">
            @if (! empty($title) || ! empty($intro))
                <div class="mb-4">
                    @if (! empty($title))
                        <h2 class="h3 mb-2">{{ $title }}</h2>
                    @endif

                    @if (! empty($intro))
                        <p class="text-body-secondary mb-0">{{ $intro }}</p>
                    @endif
                </div>
            @endif

            @if ($layout === 'logos')
                <div class="row g-4 align-items-stretch">
                    @foreach ($partners as $partner)
                        @php $primaryLink = $partner->primary_link; @endphp

                        <div class="{{ $colClass }}">
                            <div class="card h-100 text-center shadow-sm">
                                <div class="card-body d-flex flex-column justify-content-center">
                                    @if ($partner->logo_url)
                                        <img
                                            src="{{ $partner->logo_url }}"
                                            alt="{{ $partner->name }} logo"
                                            class="img-fluid mx-auto mb-3"
                                            style="max-height: 90px;"
                                        >
                                    @endif

                                    <h3 class="h5 mb-2">{{ $partner->name }}</h3>

                                    @if ($showCta && $primaryLink)
                                        <a
                                            href="{{ $primaryLink->url }}"
                                            class="btn btn-outline-primary mt-2"
                                            target="{{ $primaryLink->target }}"
                                            rel="{{ $primaryLink->rel }}"
                                        >
                                            {{ $primaryLink->effective_button_text }}
                                        </a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            @elseif ($layout === 'compact')
                <div class="list-group shadow-sm">
                    @foreach ($partners as $partner)
                        @php $primaryLink = $partner->primary_link; @endphp

                        <div class="list-group-item">
                            <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                                <div class="d-flex align-items-center gap-3">
                                    @if ($partner->logo_url)
                                        <img
                                            src="{{ $partner->logo_url }}"
                                            alt="{{ $partner->name }} logo"
                                            class="img-fluid rounded"
                                            style="width: 56px; height: 56px; object-fit: contain;"
                                        >
                                    @endif

                                    <div>
                                        <div class="d-flex align-items-center gap-2 flex-wrap">
                                            <h3 class="h5 mb-0">{{ $partner->name }}</h3>

                                            @if ($partner->badge)
                                                <span class="badge text-bg-secondary">{{ $partner->badge }}</span>
                                            @endif
                                        </div>

                                        @if ($showExcerpt && $partner->excerpt)
                                            <p class="text-body-secondary mb-0 small">
                                                {{ \Illuminate\Support\Str::limit(strip_tags($partner->excerpt), 140) }}
                                            </p>
                                        @endif

                                        @if ($showDisclosure && $partner->effective_disclosure_text)
                                            <p class="small text-body-secondary mb-0 mt-1">
                                                {{ $partner->effective_disclosure_text }}
                                            </p>
                                        @endif
                                    </div>
                                </div>

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
                            </div>
                        </div>
                    @endforeach
                </div>
            @else
                <div class="row g-4 align-items-stretch">
                    @foreach ($partners as $partner)
                        @php $primaryLink = $partner->primary_link; @endphp

                        <div class="{{ $colClass }}">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body d-flex flex-column">
                                    @if ($partner->logo_url)
                                        <img
                                            src="{{ $partner->logo_url }}"
                                            alt="{{ $partner->name }} logo"
                                            class="img-fluid mb-3"
                                            style="max-height: 90px; object-fit: contain;"
                                        >
                                    @endif

                                    <div class="d-flex align-items-center gap-2 flex-wrap mb-2">
                                        <h3 class="h5 mb-0">{{ $partner->name }}</h3>

                                        @if ($partner->badge)
                                            <span class="badge text-bg-secondary">{{ $partner->badge }}</span>
                                        @endif
                                    </div>

                                    @if ($showExcerpt && $partner->excerpt)
                                        <p class="text-body-secondary">
                                            {{ \Illuminate\Support\Str::limit(strip_tags($partner->excerpt), 160) }}
                                        </p>
                                    @endif

                                    <div class="mt-auto">
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
                    @endforeach
                </div>
            @endif
        </div>
    </section>
@endif
