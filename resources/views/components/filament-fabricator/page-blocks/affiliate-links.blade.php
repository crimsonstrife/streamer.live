@aware(['page'])

@php
    $links = collect($links ?? []);
    $showPartnerName = (bool) ($show_partner_name ?? true);
    $showCoupon = (bool) ($show_coupon ?? true);
    $showDisclosure = (bool) ($show_disclosure ?? true);

    $columns = (int) ($columns ?? 3);
    $colClass = match ($columns) {
        1 => 'col-12',
        2 => 'col-12 col-md-6',
        default => 'col-12 col-md-4',
    };
@endphp

@if ($links->isNotEmpty())
    <section class="py-4 affiliate-links-block">
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

            <div class="row g-4 align-items-stretch">
                @foreach ($links as $link)
                    @php $partner = $link->brandPartner; @endphp

                    <div class="{{ $colClass }}">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body d-flex flex-column">
                                @if ($partner?->logo_url)
                                    <img
                                        src="{{ $partner->logo_url }}"
                                        alt="{{ $partner->name }} logo"
                                        class="img-fluid mb-3"
                                        style="max-height: 80px; object-fit: contain;"
                                    >
                                @endif

                                <h3 class="h5 mb-1">{{ $link->label }}</h3>

                                @if ($showPartnerName && $partner)
                                    <p class="text-body-secondary mb-2">{{ $partner->name }}</p>
                                @endif

                                @if ($showCoupon && $link->coupon_code)
                                    <p class="mb-3">
                                        <span class="badge text-bg-dark">Code: {{ $link->coupon_code }}</span>
                                    </p>
                                @endif

                                <div class="mt-auto">
                                    <a
                                        href="{{ $link->url }}"
                                        class="btn btn-primary"
                                        target="{{ $link->target }}"
                                        rel="{{ $link->rel }}"
                                    >
                                        {{ $link->effective_button_text }}
                                    </a>

                                    @if ($showDisclosure && $partner?->effective_disclosure_text)
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
        </div>
    </section>
@endif
