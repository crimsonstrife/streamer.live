@php use App\Utilities\BlogHelper; @endphp
@aware(['page'])
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
@php
    $blogSlug = BlogHelper::getBlogSlug();
@endphp
<div class="container py-4">
    <h2 class="mb-4">Latest Posts</h2>
    <div class="row mb-2">
        @foreach($posts as $post)
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
                        <img src="{{ $postFeaturedImageUrl }}" class="card-img-top"
                             alt="{{ $postFeaturedImageAltText ?? $post->title . ' Featured Image' }}">
                    @endif
                    <div class="card-body">
                        <h5 class="card-title">{{ $post->title }}</h5>
                        <p class="mb-auto text-muted">
                            {{ Illuminate\Support\Str::limit(strip_tags($post->excerpt ?? $post->content), 30) }}
                        </p>
                        <p class="text-muted mb-1">
                            <span>
                                <x-fas-comments height="1rem"
                                                width="1rem"/>{{ $post->comments_count ?? 0 }} {{ Str::plural('comment', $post->comments_count ?? 0) }}
                            </span>
                        </p>
                        <a href="{{ route($blogSlug.'.post', ['slug' => $post->slug]) }}"
                           class="icon-link gap-1 icon-link-hover stretched-link">Read More
                            <x-fas-chevron-right height="1rem" width="auto"/>
                        </a>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>

