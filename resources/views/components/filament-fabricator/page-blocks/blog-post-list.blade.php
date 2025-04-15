@aware(['page'])

<div class="container py-4">
    <h2 class="mb-4">Latest Posts</h2>
    <div class="row">
        @foreach($posts ?? [] as $post)
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    @if ($post->featured_image)
                        <img src="{{ asset($post->featured_image) }}" class="card-img-top" alt="{{ $post->title }}">
                    @endif
                    <div class="card-body">
                        <h5 class="card-title">{{ $post->title }}</h5>
                        <p class="card-text text-muted">
                            {{ Illuminate\Support\Str::limit(strip_tags($post->excerpt ?? $post->content), 100) }}
                        </p>
                        <p class="text-muted mb-1">
                            <i class="bi bi-chat-left-text"></i>
                            {{ $post->comments_count ?? 0 }} {{ Str::plural('comment', $post->comments_count ?? 0) }}
                        </p>
                        <a href="{{ route('blog.post', ['slug' => $post->slug]) }}"
                           class="btn btn-outline-primary btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
