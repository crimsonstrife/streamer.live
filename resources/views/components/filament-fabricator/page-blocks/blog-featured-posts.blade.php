@aware(['page'])

@php
    $blogSlug = \App\Utilities\BlogHelper::getBlogSlug();
    $featured = ($posts ?? collect())->where('is_featured', true)->take(3);
@endphp
@if ($featured->isNotEmpty())
    <div class="container py-5 bg-light rounded">
        <h2 class="mb-4">Featured Posts</h2>
        <div class="row">
            @foreach($featured as $post)
                @php
                    $postMedia = $post->getMedia("images");
                @endphp
                @if($postMedia->isNotEmpty())
                    @php
                        $postFeaturedImageUrl = $postMedia[0]->getUrl();
                        $postFeaturedImageAltText = $postMedia[0]->getCustomProperty('image_alt_text');
                    @endphp
                @endif
                <div class="col-md-4 mb-4">
                    <div class="card shadow-sm h-100">
                        @if ($postMedia->isNotEmpty())
                            <img src="{{ $postFeaturedImageUrl }}" class="card-img-top" alt="{{ $postFeaturedImageAltText ?? $post->title . ' Featured Image' }}">
                        @endif
                        <div class="card-body">
                            <h5 class="card-title">{{ $post->title }}</h5>
                            <p class="mb-auto text-muted">
                                {{ Illuminate\Support\Str::limit(strip_tags($post->excerpt ?? $post->content), 30) }}
                            </p>
                            <p class="text-muted mb-1">
                            <span>
                                <x-fas-comments height="1rem" width="1rem" />{{ $post->comments_count ?? 0 }} {{ Str::plural('comment', $post->comments_count ?? 0) }}
                            </span>
                            </p>
                            <a href="{{ route($blogSlug.'.post', ['slug' => $post->slug]) }}"
                               class="icon-link gap-1 icon-link-hover stretched-link">Read More
                                <x-fas-chevron-right height="1rem" width="auto" />
                            </a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endif
