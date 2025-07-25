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

        .bd-mode-toggle {
            z-index: 1500;
        }

        .bd-mode-toggle .dropdown-menu .active .bi {
            display: block !important;
        }
    </style>
@endpush
@if ($post->author)
    <div class="container mt-5">
        <div class="p-4 mb-3 rounded">
            <h4 class="fst-italic">About the Author</h4>
            <div class="d-flex align-items-center">
                @if ($post->author->avatar_url)
                    <img src="{{ asset($post->author->avatar_url) }}" alt="{{ $post->author->name }}"
                         class="rounded-circle me-3" width="64" height="64">
                @endif
                <div>
                    <h5 class="mb-1">{{ $post->author->name }}</h5>
                    <span class="text-muted mb-0">{!! $post->author->biography() !!}</span>
                </div>
            </div>
        </div>
    </div>
@endif

