@aware(['page', 'post'])
@push('styles')
    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }

        .b-example-divider {
            width: 100%;
            height: 3rem;
            background-color: rgba(0, 0, 0, .1);
            border: solid rgba(0, 0, 0, .15);
            border-width: 1px 0;
            box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
        }

        .b-example-vr {
            flex-shrink: 0;
            width: 1.5rem;
            height: 100vh;
        }

        .bi {
            vertical-align: -.125em;
            fill: currentColor;
        }

        .nav-scroller {
            position: relative;
            z-index: 2;
            height: 2.75rem;
            overflow-y: hidden;
        }

        .nav-scroller .nav {
            display: flex;
            flex-wrap: nowrap;
            padding-bottom: 1rem;
            margin-top: -1px;
            overflow-x: auto;
            text-align: center;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
        }

        .btn-bd-primary {
            --bd-violet-bg: #712cf9;
            --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

            --bs-btn-font-weight: 600;
            --bs-btn-color: var(--bs-white);
            --bs-btn-bg: var(--bd-violet-bg);
            --bs-btn-border-color: var(--bd-violet-bg);
            --bs-btn-hover-color: var(--bs-white);
            --bs-btn-hover-bg: #6528e0;
            --bs-btn-hover-border-color: #6528e0;
            --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
            --bs-btn-active-color: var(--bs-btn-hover-color);
            --bs-btn-active-bg: #5a23c8;
            --bs-btn-active-border-color: #5a23c8;
        }

        .bd-mode-toggle {
            z-index: 1500;
        }

        .bd-mode-toggle .dropdown-menu .active .bi {
            display: block !important;
        }
    </style>
@endpush
@if (!isset($post))
    <div class="alert alert-danger">No post found in context.</div>
@else
    <div class="container py-5">
        <article class="blog-post">
            <h2 class="display-5 link-body-emphasis mb-1">{{ $post->title }}</h2>
            <p class="blog-post-meta">{{ $post->created_at->format('F j, Y') }} by <a
                    href="#">{{ $post->author->name ?? 'Unknown' }}</a></p>
            @php
                $summary = $post->getReactionSummary();
                $postMedia = $post->getMedia('images');
            @endphp
            @if($postMedia->isNotEmpty())
                @php
                    $postFeaturedImageUrl = $postMedia[0]->getUrl();
                    $postFeaturedImageAltText = $postMedia[0]->getCustomProperty('image_alt_text');
                @endphp
            @endif
            @foreach ($summary as $type => $count)
                <span class="badge bg-secondary">{{ ucfirst($type) }}: {{ $count }}</span>
            @endforeach
            @if ($postMedia->isNotEmpty())
                <img src="{{ $postFeaturedImageUrl }}" class="img-fluid mb-4 rounded shadow"
                     alt="{{ $postFeaturedImageAltText ?? $post->title . ' Featured Image' }}">
            @endif

            <div class="prose max-w-none">{!! $post->content_with_media !!}</div>

            <div class="row">
                <div class="mb-3">
                    <form method="POST"
                          action="{{ route('blog.reaction.toggle', ['type' => 'like', 'post' => $post->slug]) }}">
                        @csrf
                        <button class="btn btn-sm btn-outline-primary" type="submit"><x-fas-thumbs-up /> Like
                            ({{ $post->countReactions('like') }})
                        </button>
                    </form>
                </div>
                <div class="mb-3">
                    <form method="POST"
                          action="{{ route('blog.reaction.toggle', ['type' => 'dislike', 'post' => $post->slug]) }}">
                        @csrf
                        <button class="btn btn-sm btn-outline-primary" type="submit"><x-fas-thumbs-down /> Dislike
                            ({{ $post->countReactions('dislike') }})
                        </button>
                    </form>
                </div>
            </div>
        </article>
    </div>
@endif

