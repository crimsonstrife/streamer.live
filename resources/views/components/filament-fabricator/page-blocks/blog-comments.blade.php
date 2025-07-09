@aware(['page', 'post', 'comments'])
@push('styles')
    <style>
        .post-comments {
            padding-bottom: 9px;
            margin: 5px 0 5px;
        }

        .comments-nav {
            border-bottom: 1px solid #eee;
            margin-bottom: 5px;
        }

        .post-comments .comment-meta {
            border-bottom: 1px solid #eee;
            margin-bottom: 5px;
        }

        .post-comments .media {
            border-left: 1px dotted #000;
            border-bottom: 1px dotted #000;
            margin-bottom: 5px;
            padding-left: 10px;
        }

        .post-comments .media-heading {
            font-size: 12px;
            color: grey;
        }

        .post-comments .comment-meta a {
            font-size: 12px;
            color: grey;
            font-weight: bolder;
            margin-right: 5px;
        }

        .comment-img {
            display: inline-block;
            width: 3rem;
            height: 3rem;
            background-color: var(--bs-secondary-bg);
        }

        .comment-replies .comment-img {
            width: 1.75rem;
            height: 1.75rem;
        }

        .comment a, .comment-replies a {
            text-decoration: none !important;
        }

        .sort-btn.btn-secondary,
        .comment .btn-secondary,
        .comment-replies .btn-secondary {
            --bs-btn-box-shadow: none;
            --bs-btn-focus-box-shadow: none;
            --bs-btn-hover-shadow: none;
            --bs-btn-active-shadow: none;
            --bs-btn-border-color: transparent;
            --bs-btn-focus-border-color: transparent;
            --bs-btn-hover-border-color: transparent;
            --bs-btn-active-border-color: transparent;
            --bs-btn-color: var(--bs-body);
            --bs-btn-hover-color: var(--bs-body);
            --bs-btn-active-color: var(--bs-body);
            --bs-btn-bg: transparent;
            --bs-btn-hover-bg: rgba(var(--bs-secondary-rgb), .075);
            --bs-btn-active-bg: rgba(var(--bs-secondary-rgb), .15);
        }

        .comment .btn-primary,
        .comment-replies .btn-primary {
            --bs-btn-box-shadow: none;
            --bs-btn-focus-box-shadow: none;
            --bs-btn-hover-shadow: none;
            --bs-btn-active-shadow: none;
            --bs-btn-border-color: transparent;
            --bs-btn-focus-border-color: transparent;
            --bs-btn-hover-border-color: transparent;
            --bs-btn-active-border-color: transparent;
            --bs-btn-color: var(--bs-primary);
            --bs-btn-hover-color: var(--bs-primary);
            --bs-btn-active-color: var(--bs-primary);
            --bs-btn-bg: transparent;
            --bs-btn-hover-bg: rgba(var(--bs-primary-rgb), .075);
            --bs-btn-active-bg: rgba(var(--bs-primary-rgb), .15);
        }

        .comment .btn-danger,
        .comment-replies .btn-danger {
            --bs-btn-box-shadow: none;
            --bs-btn-focus-box-shadow: none;
            --bs-btn-hover-shadow: none;
            --bs-btn-active-shadow: none;
            --bs-btn-border-color: transparent;
            --bs-btn-focus-border-color: transparent;
            --bs-btn-hover-border-color: transparent;
            --bs-btn-active-border-color: transparent;
            --bs-btn-color: var(--bs-danger);
            --bs-btn-hover-color: var(--bs-danger);
            --bs-btn-active-color: var(--bs-danger);
            --bs-btn-bg: transparent;
            --bs-btn-hover-bg: rgba(var(--bs-danger-rgb), .075);
            --bs-btn-active-bg: rgba(var(--bs-danger-rgb), .15);
        }

        .form-floating.comment-compose > .form-control,
        .form-floating.comment-compose > .form-control:focus {
            border: 0;
            box-shadow: none;
            background-color: transparent;
            border-bottom: 2px var(--bs-border-style) var(--bs-body-color);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            padding: 1rem 0.15rem 0.5rem;
        }

        .form-floating.comment-compose > .form-control:not(:-moz-placeholder-shown) ~ label::after {
            color: var(--bs-secondary-color);
            background-color: transparent;
            padding: 0;
            line-height: 1;
        }

        .form-floating.comment-compose > .form-control:not(:-ms-input-placeholder) ~ label::after {
            color: var(--bs-secondary-color);
            background-color: transparent;
            padding: 0;
            line-height: 1;
        }

        .form-floating.comment-compose > label,
        .form-floating.comment-compose > .form-control:focus ~ label::after,
        .form-floating.comment-compose > .form-control:not(:placeholder-shown) ~ label::after {
            color: var(--bs-secondary-color);
            background-color: transparent;
            padding: 0;
            line-height: 1;
        }

        .comment .btn[data-bs-toggle=collapse][aria-expanded=true] .chevron-down,
        .comment .btn[data-bs-toggle=collapse][aria-expanded=false] .chevron-up {
            display: none;
        }
    </style>
@endpush
@if (! isset($post))
    <div class="alert alert-danger">Comments block requires a post context.</div>
@else
    @php
        // Grab sort from query-string (default = newest)
        $sort = request()->query('sort', 'newest');
        // Filter only approved top-level comments
        $comments = $post
            ->comments
            ->where('approved', true)
            ->whereNull('reply_id');

        // Perform collection-based sort
        if ($sort === 'top') {
            $comments = $comments->sortByDesc('score');
        } elseif ($sort === 'oldest') {
            $comments = $comments->sortBy('created_at');
        } else { // newest
            $comments = $comments->sortByDesc('created_at');
        }
    @endphp
    <div class="container mt-5">
        <div class="mb-5 hstack gap-3 align-items-center">
            <div class="fs-5">
                <h4>Comments ({{ count($comments) }})</h4>
            </div>
            <div class="dropdown">
                <button
                    class="btn sort-btn btn-link dropdown-toggle hstack align-items-center gap-2 py-1 px-2 fw-normal"
                        data-bs-toggle="dropdown" role="button" aria-expanded="false">
                    <span class="ski" style="font-size:1.5em;"><x-fas-arrow-down-wide-short height="2rem" width="auto"/></span>
                    <span>Sort by</span>
                </button>
                <ul class="dropdown-menu mt-1">
                    <li>
                        <a class="dropdown-item @if($sort==='top') active @endif"
                           href="{{ request()->fullUrlWithQuery(['sort' => 'top']) }}">Top comments</a>
                    </li>
                    <li>
                        <a class="dropdown-item @if($sort==='newest') active @endif"
                           href="{{ request()->fullUrlWithQuery(['sort' => 'newest']) }}">Newest first</a>
                    </li>
                    <li>
                        <a class="dropdown-item @if($sort==='oldest') active @endif"
                           href="{{ request()->fullUrlWithQuery(['sort' => 'oldest']) }}">Oldest first</a>
                    </li>
                </ul>
            </div>
        </div>
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @auth
            @if($commentsLocked)
                <div class="alert alert-warning">
                    {{ __('Comments have been locked for this post.') }}
                </div>
            @else
                @php
                    $user = Auth::getUser();
                @endphp
                {{-- Reply Banner (bootstrap collapse toggles “show” on this element) --}}
                <div class="collapse mb-3" id="replyCommentT">
                    <div class="alert alert-info py-2 px-3 mb-2">Replying to <strong id="replyingToName">someone</strong>
                        <button type="button" class="btn-close float-end" aria-label="Cancel reply"
                                onclick="clearReply()"></button>
                    </div>
                </div>
                <div class="comment-box">
                    <div class="d-flex comment">
                        <img class="rounded-circle comment-img" src="{{ $user->profile_photo_url }}" height="50px"
                             width="50px" alt="profile photo">
                        <div class="flex-grow-1 ms-3">
                            <form method="POST" action="{{ route('blog.comment.submit', ['post' => $post->slug]) }}">
                                @csrf
                                <div class="form-group">
                                    <input type="hidden" name="reply_id" id="reply_id" value="">
                                    <input type="hidden" name="post_id" value="{{ $post->id }}">
                                    <div class="form-floating comment-compose mb-2">
                                        <label for="commentMessage" style="position: relative;">Leave a comment here</label>
                                        <x-content-editor id="commentMessage" name="content" :mentions="true" class="form-control w-100" rows="3" required />
                                    </div>
                                </div>
                                <div class="hstack justify-content-end gap-1">
                                    <button type="reset" class="btn btn-sm btn-secondary rounded-pill">Cancel</button>
                                    <button type="submit" class="btn btn-sm btn-primary rounded-pill">Comment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            @endif
        @endauth
        <div class="post-comments">
            <div class="comments-nav">
            </div>
            <div class="vstack gap-4" style="--sk-icon-btn-size:1.25em;--sk-icon-btn-padding:.25rem;">
                @foreach ($comments->whereNull('reply_id') as $comment)
                    <div class="row">
                        @include('filament.components.comment-thread', ['comment' => $comment])
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endif
@push('scripts')
    <script>
        // When you click any “Reply” link...
        document.querySelectorAll('.reply-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                // 1) Grab the ID & the author’s name
                const replyId = this.dataset.replyId;
                const replyingTo = this.closest('.comment')
                    .querySelector('.fw-bold')
                    .textContent.trim();
                // 2) Populate the hidden field + banner text
                document.getElementById('reply_id').value = replyId;
                document.getElementById('replyingToName').textContent = replyingTo;
                // 3) Show the banner (Bootstrap collapse just toggles 'show')
                const banner = document.getElementById('replyCommentT');
                banner.classList.add('show');
            });
        });

        // Clear reply state
        window.clearReply = function () {
            document.getElementById('reply_id').value = '';
            const banner = document.getElementById('replyCommentT');
            banner.classList.remove('show');
        };
    </script>
@endpush

