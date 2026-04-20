<x-app-layout>
    @php
        /** @var \App\Models\SponsorObjects\Goal $goal */
        /** @var \App\Models\SponsorObjects\Donation $donation */
        $bannerUrl = $goal->banner_url;
        $galleryMedia = $goal->getMedia('gallery');
        $carouselId = 'sponsor-gallery-'.$goal->id;
        $settings = app(\App\Settings\StripeSettings::class);
        $presets = [10, 25, 50, 100];
        $donors = $goal->donations()
            ->whereNotNull('paid_at')
            ->orderByDesc('amount')
            ->paginate(5);
    @endphp

    @if($bannerUrl)
        <div class="mb-4 rounded overflow-hidden position-relative" style="max-height:420px;">
            <img src="{{ $bannerUrl }}"
                 alt="{{ $goal->getFirstMedia('banner')?->getCustomProperty('image_alt_text') ?? $goal->title }}"
                 class="w-100"
                 style="object-fit:cover;max-height:420px;">
        </div>
    @endif

    <div class="mb-4">
        <h1 class="h2 mb-2">{{ $goal->title }}</h1>
        @if($goal->summary)
            <p class="lead text-muted mb-0">{{ $goal->summary }}</p>
        @endif
    </div>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @elseif(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <div class="row g-4">
        <div class="col-lg-8">
            @if($galleryMedia->count() > 0)
                <div id="{{ $carouselId }}" class="carousel slide shadow-sm rounded mb-4" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        @foreach($galleryMedia as $i => $media)
                            <button type="button"
                                    data-bs-target="#{{ $carouselId }}"
                                    data-bs-slide-to="{{ $i }}"
                                    class="{{ $i === 0 ? 'active' : '' }}"
                                    aria-label="Slide {{ $i + 1 }}"
                                    @if($i === 0) aria-current="true" @endif></button>
                        @endforeach
                    </div>
                    <div class="carousel-inner rounded">
                        @foreach($galleryMedia as $i => $media)
                            <div class="carousel-item {{ $i === 0 ? 'active' : '' }}">
                                <img src="{{ $media->getUrl() }}"
                                     alt="{{ $media->getCustomProperty('image_alt_text') ?? $goal->title }}"
                                     class="d-block w-100"
                                     style="object-fit:cover;aspect-ratio:16/9;">
                                @if($caption = $media->getCustomProperty('caption'))
                                    <div class="carousel-caption d-none d-md-block">
                                        <p class="mb-0 bg-dark bg-opacity-50 px-2 py-1 rounded d-inline-block">
                                            {{ $caption }}
                                        </p>
                                    </div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                    @if($galleryMedia->count() > 1)
                        <button class="carousel-control-prev" type="button"
                                data-bs-target="#{{ $carouselId }}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button"
                                data-bs-target="#{{ $carouselId }}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    @endif
                </div>
            @endif

            @if($goal->description)
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        {!! clean($goal->description) !!}
                    </div>
                </div>
            @endif

            @if($donors->isNotEmpty())
                <div class="card shadow-sm">
                    <div class="card-header bg-white">
                        <h5 class="mb-0">Supporters</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        @foreach($donors as $donor)
                            @php($showMessage = ($donor->is_message_approved && filled($donor->message)))
                            <li class="list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2">
                                <span>
                                    <strong>{{ $donor->displayName() }}</strong>
                                    <small class="text-muted d-block">{{ $donor->paid_at?->diffForHumans() }}</small>
                                </span>
                                <span class="badge bg-success rounded-pill">
                                    {{ $donor->amount?->symbolFormatted() }}
                                </span>
                                @if($showMessage)
                                    <p class="w-100 mb-0 mt-2">{{ $donor->message }}</p>
                                @endif
                            </li>
                        @endforeach
                    </ul>
                    @if($donors->hasPages())
                        <div class="card-footer bg-white d-flex justify-content-center">
                            {{ $donors->links() }}
                        </div>
                    @endif
                </div>
            @endif
        </div>

        <div class="col-lg-4">
            <div class="card shadow-sm mb-4 sticky-top" style="top:1rem;">
                <div class="card-body">
                    @include('sponsor.partials.progress', ['goal' => $goal])

                    @if($goal->starts_at || $goal->ends_at)
                        <div class="text-muted small mt-3">
                            @if($goal->starts_at)
                                <div>Started: {{ $goal->starts_at->toFormattedDateString() }}</div>
                            @endif
                            @if($goal->ends_at)
                                <div>Ends: {{ $goal->ends_at->toFormattedDateString() }}</div>
                            @endif
                        </div>
                    @endif

                    <hr>

                    @if($errors->any())
                        <div class="alert alert-danger">
                            <ul class="mb-0 ps-3">
                                @foreach($errors->all() as $err)
                                    <li>{{ $err }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('sponsor.checkout', $goal->slug) }}">
                        @csrf

                        <label class="form-label fw-semibold">Choose an amount</label>
                        <div class="btn-group d-flex flex-wrap mb-2" role="group" aria-label="Preset amounts">
                            @foreach($presets as $preset)
                                <input type="radio"
                                       class="btn-check"
                                       name="amount_preset"
                                       id="amount-{{ $preset }}"
                                       autocomplete="off"
                                       value="{{ $preset }}"
                                       onclick="document.getElementById('sponsor-amount').value = '{{ $preset }}';">
                                <label class="btn btn-outline-primary flex-fill"
                                       for="amount-{{ $preset }}">${{ $preset }}</label>
                            @endforeach
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text">$</span>
                            <input type="number"
                                   id="sponsor-amount"
                                   name="amount"
                                   class="form-control @error('amount') is-invalid @enderror"
                                   min="{{ $settings->min_donation }}"
                                   max="{{ $settings->max_donation }}"
                                   step="0.01"
                                   placeholder="Other amount"
                                   value="{{ old('amount') }}"
                                   required>
                            @error('amount')
                            <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>

                        <div class="mb-3">
                            <label for="donor_name" class="form-label">Your name</label>
                            <input type="text"
                                   id="donor_name"
                                   name="donor_name"
                                   class="form-control @error('donor_name') is-invalid @enderror"
                                   maxlength="120"
                                   value="{{ old('donor_name', auth()->user()?->name) }}">
                            @error('donor_name')
                            <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>

                        @guest
                            <div class="mb-3">
                                <label for="donor_email" class="form-label">Email <span
                                        class="text-danger">*</span></label>
                                <input type="email"
                                       id="donor_email"
                                       name="donor_email"
                                       class="form-control @error('donor_email') is-invalid @enderror"
                                       value="{{ old('donor_email') }}"
                                       required>
                                <div class="form-text">We'll email your receipt here.</div>
                                @error('donor_email')
                                <div class="invalid-feedback">{{ $message }}</div> @enderror
                            </div>
                        @endguest

                        <div class="form-check mb-3">
                            <input class="form-check-input"
                                   type="checkbox"
                                   name="is_anonymous"
                                   id="is_anonymous"
                                   value="1"
                                {{ old('is_anonymous') ? 'checked' : '' }}>
                            <label class="form-check-label" for="is_anonymous">
                                Show me as Anonymous
                            </label>
                        </div>

                        <div class="mb-3">
                            <label for="message" class="form-label">Message <span
                                    class="text-muted small">(optional)</span></label>
                            <textarea id="message"
                                      name="message"
                                      class="form-control @error('message') is-invalid @enderror"
                                      rows="3"
                                      maxlength="500">{{ old('message') }}</textarea>
                            <div class="form-text">Messages are reviewed before being shown publicly.</div>
                            @error('message')
                            <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>

                        <button type="submit" class="btn btn-success w-100">
                            Sponsor now
                        </button>
                        <p class="text-muted small text-center mt-2 mb-0">
                            Payment is processed securely by <a class="link-body-emphasis" href="https://stripe.com"
                                                                target="_blank" rel="noopener">
                                <x-dynamic-component :component="'fab-stripe'" width="40" height="40"/>
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
