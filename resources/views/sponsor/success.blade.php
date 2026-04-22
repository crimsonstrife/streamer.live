<x-app-layout>
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="card shadow-sm text-center">
                <div class="card-body p-5">
                    <div class="display-4 text-success mb-3">
                        <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                    </div>
                    <h1 class="h3 mb-3">Thank you for your support!</h1>

                    @if($donation && $donation->status === 'succeeded')
                        <p class="lead mb-2">
                            {{ $donation->amount?->symbolFormatted() }} sponsored toward
                            <strong>{{ $donation->goal?->title }}</strong>.
                        </p>
                    @elseif($donation)
                        <p class="lead mb-2">
                            Your sponsorship is being processed. This page will reflect it shortly.
                        </p>
                    @else
                        <p class="lead mb-2">Your sponsorship helps us hit our goal.</p>
                    @endif

                    <p class="text-muted mb-4">
                        Stripe is sending you an email receipt to your inbox.
                    </p>

                    <div class="d-flex justify-content-center gap-2">
                        @if($donation?->goal)
                            <a href="{{ route('sponsor.show', $donation->goal->slug) }}" class="btn btn-outline-primary">
                                Back to this goal
                            </a>
                        @endif
                        <a href="{{ route('sponsor.index') }}" class="btn btn-primary">
                            See all goals
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
