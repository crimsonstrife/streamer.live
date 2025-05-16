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
<div class="container py-4">
    <h2 class="mb-4">Latest Posts</h2>
    <div class="row mb-2">
        @foreach($posts ?? [] as $post)
            <div class="col-md-6">
                <div
                    class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    @if ($post->hasBanner())
                        <div class="col-auto d-none d-lg-block">
                            <div
                                style="overflow: hidden;width: 100%; max-width: 250px;position: relative;margin: 0 auto; height: 250px;">
                                <img src="{{ $post->banner_url }}" class="card-img-top" alt="{{ $post->title }}"
                                     preserveAspectRatio="xMidYMid slice" focusable="false"
                                     style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>
                    @endif
                    <div class="col p-4 d-flex flex-column position-static">
                        <strong class="d-inline-block mb-2">{{ $post->category->name }}</strong>
                        <h3 class="mb-0">{{ $post->title }}</h3>
                        <div class="mb-1 text-body-secondary">{{ $post->created_at->format('F j, Y') }}</div>
                        <p class="mb-auto text-muted">
                            {{ Illuminate\Support\Str::limit(strip_tags($post->excerpt ?? $post->content), 30) }}
                        </p>
                        <p class="text-muted mb-1">
                            <i class="bi bi-chat-left-text"></i>
                            {{ $post->comments_count ?? 0 }} {{ Str::plural('comment', $post->comments_count ?? 0) }}
                        </p>
                        <a href="{{ route('blog.post', ['slug' => $post->slug]) }}"
                           class="icon-link gap-1 icon-link-hover stretched-link">Read More
                            <svg class="bi">
                                <use xlink:href="#chevron-right"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>

