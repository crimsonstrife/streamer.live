<x-app-layout>
    <x-slot name="header">
        <h2 class="h4 text-dark">
            {{ __('Newsletter Subscription Management') }}
        </h2>
    </x-slot>

    <div class="container py-5">
        <h2>Unsubscribe from the Newsletter</h2>

        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @elseif(session('error'))
            <div class="alert alert-danger">{{ session('error') }}</div>
        @endif

        <form action="{{ route('newsletter.unsubscribe') }}" method="POST" class="mt-4">
            @csrf

            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control @error('email') is-invalid @enderror"
                    value="{{ old('email') }}"
                    required
                >
                @error('email')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <button type="submit" class="btn btn-outline-secondary">
                Unsubscribe
            </button>
        </form>
    </div>
</x-app-layout>
