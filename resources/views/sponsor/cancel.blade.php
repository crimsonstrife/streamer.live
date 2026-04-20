<x-app-layout>
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <div class="card shadow-sm text-center">
                <div class="card-body p-5">
                    <div class="display-4 text-warning mb-3">
                        <i class="bi bi-slash-circle" aria-hidden="true"></i>
                    </div>
                    <h1 class="h3 mb-3">Sponsorship cancelled</h1>
                    <p class="lead mb-2">No charge was made — your card has not been billed.</p>
                    <p class="text-muted mb-4">
                        Changed your mind? You can pick another amount whenever you're ready.
                    </p>
                    <a href="{{ route('sponsor.index') }}" class="btn btn-primary">
                        Back to goals
                    </a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
