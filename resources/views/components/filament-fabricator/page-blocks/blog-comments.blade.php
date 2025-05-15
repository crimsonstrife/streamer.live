@aware(['page', 'post'])
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
    <div class="container mt-5">
        <div class="mb-5 hstack gap-3 align-items-center">
            <div class="fs-5">
                <h4>Comments ({{ $post->comments->count() }})</h4>
            </div>
            <div class="dropdown">
                <button class="sort-btn btn btn-secondary hstack align-items-center gap-2 py-1 px-2 fw-normal"
                        data-bs-toggle="dropdown" role="button" aria-expanded="false">
                    <span class="ski" style="font-size:1.5em;"><svg aria-hidden="true"
                                                                    class="svg-icon mdi-outlined mdi-sort"
                                                                    xmlns="http://www.w3.org/2000/svg" width="48"
                                                                    height="48" viewBox="0 -960 960 960"><path
                                d="M120-240v-60h240v60H120Zm0-210v-60h480v60H120Zm0-210v-60h720v60H120Z"></path></svg></span>
                    <span>Sort by</span>
                </button>
                <div class="dropdown-menu mt-1">
                    <div><a class="dropdown-item" href="#">Top comments</a></div>
                    <div><a class="dropdown-item" href="#">Newest first</a></div>
                </div>
            </div>
        </div>
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @auth
            @php
                $user = Auth::getUser();
            @endphp
        <div class="collapse" id="replyCommentT">
            {{-- Replying To Info --}}
            <div id="replyingToContainer" class="mb-3 d-none">
                <div class="alert alert-info py-2 px-3 mb-2">
                    Replying to <strong id="replyingToName">someone</strong>
                    <button type="button" class="btn-close float-end" aria-label="Cancel reply"
                            onclick="clearReply()"></button>
                </div>
            </div>
        </div>
            <div class="comment-box">
                <div class="d-flex comment">
                    <img class="rounded-circle comment-img" src="{{ $user->profile_photo_url }}" height="50px"
                         width="50px">
                    <div class="flex-grow-1 ms-3">
                        <form method="POST" action="{{ route('blog.comment.submit', ['post' => $post->slug]) }}">
                            @csrf
                            <div class="form-group">
                                <input type="hidden" name="reply_id" id="reply_id" value="">
                                <input type="hidden" name="post_id" value="{{ $post->id }}">
                                <div class="form-floating comment-compose mb-2">
                                    <textarea name="text" class="form-control w-100" rows="3"
                                              placeholder="Leave a comment here" required></textarea>
                                    <label for="text">Leave a comment here</label>
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
        @endauth
        <div class="post-comments">
            <div class="comments-nav">
            </div>
            <div class="vstack gap-4" style="--sk-icon-btn-size:1.25em;--sk-icon-btn-padding:.25rem;">
                @foreach ($post->comments->whereNull('reply_id') as $comment)
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
        document.querySelectorAll('.reply-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const replyId = this.dataset.replyId;
                const replyTo = this.closest('.comment')?.querySelector('strong')?.textContent?.trim() || 'someone';

                // Set reply ID
                document.getElementById('reply_id').value = replyId;

                // Set visual reply context
                document.getElementById('replyingToName').textContent = replyTo;
                document.getElementById('replyingToContainer').classList.remove('d-none');

                // Scroll into view
                const textarea = document.querySelector('textarea[name="text"]');
                if (textarea) {
                    textarea.focus();
                    textarea.scrollIntoView({behavior: 'smooth', block: 'center'});
                }
            });
        });

        // Clear reply state
        window.clearReply = function () {
            document.getElementById('reply_id').value = '';
            document.getElementById('replyingToContainer').classList.add('d-none');
        };
    </script>
@endpush

