@aware(['page', 'post'])

@if (! isset($post))
    <div class="alert alert-danger">Comments block requires a post context.</div>
@else
    <div class="container mt-5">
        <h4>Comments ({{ $post->comments->count() }})</h4>
        @if (session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif
        @auth
            {{-- Replying To Info --}}
            <div id="replyingToContainer" class="mb-3 d-none">
                <div class="alert alert-info py-2 px-3 mb-2">
                    Replying to <strong id="replyingToName">someone</strong>
                    <button type="button" class="btn-close float-end" aria-label="Cancel reply"
                            onclick="clearReply()"></button>
                </div>
            </div>

            <form method="POST" action="{{ route('blog.comment.submit', ['post' => $post->slug]) }}">
                @csrf
                <input type="hidden" name="reply_id" id="reply_id" value="">
                <input type="hidden" name="post_id" value="{{ $post->id }}">

                <div class="mb-3">
                    <label for="text">Your Comment</label>
                    <textarea name="text" class="form-control" required></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        @endauth

        @foreach ($post->comments->whereNull('reply_id') as $comment)
            @include('filament.components.comment-thread', ['comment' => $comment])
        @endforeach
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

