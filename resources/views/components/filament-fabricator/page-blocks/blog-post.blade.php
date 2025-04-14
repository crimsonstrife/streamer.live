@aware(['page', 'post'])

@if (!isset($post))
    <div class="alert alert-danger">No post found in context.</div>
@else
    <div class="container py-5">
        <h1 class="mb-3">{{ $post->title }}</h1>
        <p class="text-muted mb-4">
            By {{ $post->author->name ?? 'Unknown' }} • {{ $post->created_at->format('F j, Y') }}
        </p>
        @if ($post->featured_image)
            <img src="{{ asset($post->featured_image) }}" class="img-fluid mb-4 rounded shadow"
                 alt="{{ $post->title }}">
        @endif

        <article class="prose max-w-none">
            {!! $post->content !!}
        </article>
    </div>
@endif

