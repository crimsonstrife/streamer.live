@aware(['page'])

@php
    $featured = ($posts ?? collect())->where('is_featured', true)->take(3);
@endphp

@if ($featured->isNotEmpty())
    <div class="container py-5 bg-light rounded">
        <h2 class="mb-4">Featured Posts</h2>
        <div class="row">
            @foreach($featured as $post)
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm h-100">
                        @if ($post->hasBanner())
                            <img src="{{ $post->banner_url }}" class="card-img-top" alt="{{ $post->title }}">
                        @endif
                        <div class="card-body">
                            <h5 class="card-title">{{ $post->title }}</h5>
                            <p class="card-text text-muted">
                                {{ Str::limit(strip_tags($post->excerpt ?? $post->content), 100) }}
                            </p>
                            <a href="{{ url($post->slug) }}" class="btn btn-primary btn-sm">Read More</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endif
