@aware(['page', 'post'])

@if ($post->author)
    <div class="container mt-5">
        <div class="card shadow-sm p-4 bg-light">
            <div class="d-flex align-items-center">
                @if ($post->author->avatar_url)
                    <img src="{{ asset($post->author->avatar_url) }}" alt="{{ $post->author->name }}"
                         class="rounded-circle me-3" width="64" height="64">
                @endif
                <div>
                    <h5 class="mb-1">{{ $post->author->name }}</h5>
                    <p class="text-muted mb-0">{{ $post->author->bio }}</p>
                </div>
            </div>
        </div>
    </div>
@endif

