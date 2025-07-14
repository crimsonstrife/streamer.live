<x-card class="mb-4">
    <div class="d-flex align-items-center">
        <img src="{{ auth()->user()->profile_photo_url }}" class="rounded-circle me-3" width="64">
        <div>
            <h4 class="mb-0">{{ auth()->user()->username }}</h4>
            <small class="text-muted">{{ auth()->user()->email }}</small>
        </div>
    </div>
    <div class="mt-3">
        <a href="{{ route('profile.show') }}" class="btn btn-outline-primary btn-sm">Manage Profile</a>
    </div>
</x-card>
