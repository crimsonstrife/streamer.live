@aware(['page', 'post'])

@if (!isset($post))
    <div class="alert alert-danger">No post found in context.</div>
@else
    <div class="container py-5">
        <h1 class="mb-3">{{ $post->title }}</h1>
        <p class="text-muted mb-4">
            By {{ $post->author->name ?? 'Unknown' }} • {{ $post->created_at->format('F j, Y') }}
        </p>
        @php
            $summary = $post->getReactionSummary();
        @endphp

        @foreach ($summary as $type => $count)
            <span class="badge bg-secondary">{{ ucfirst($type) }}: {{ $count }}</span>
        @endforeach
        @if ($post->featured_image)
            <img src="{{ asset($post->featured_image) }}" class="img-fluid mb-4 rounded shadow"
                 alt="{{ $post->title }}">
        @endif

        <article class="prose max-w-none">
            {!! $post->content !!}
        </article>
        <div class="mb-3">
            <form method="POST" action="{{ route('blog.reaction.toggle', ['type' => 'like', 'post' => $post->slug]) }}">
                @csrf
                <button class="btn btn-sm btn-outline-primary" type="submit">
                    👍 Like ({{ $post->countReactions('like') }})
                </button>
            </form>
        </div>
        <div class="mb-3">
            <form method="POST"
                  action="{{ route('blog.reaction.toggle', ['type' => 'dislike', 'post' => $post->slug]) }}">
                @csrf
                <button class="btn btn-sm btn-outline-primary" type="submit">
                    👎 Dislike ({{ $post->countReactions('dislike') }})
                </button>
            </form>
        </div>

    </div>
@endif

