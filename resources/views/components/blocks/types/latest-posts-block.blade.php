@if ($isEditing)
    <p class="text-muted">Latest Posts will be displayed here.</p>
@else
    <div class="p-4 bg-white border rounded shadow">
        <h3 class="text-lg font-semibold">Latest Posts</h3>

        @php
            $posts = \App\Models\Post::where('status', 'published')
                ->orderBy('published_at', 'desc')
                ->limit($block['content']['limit'] ?? 5)
                ->get();
        @endphp

        <ul class="mt-2 list-group">
            @foreach ($posts as $post)
                <li class="list-group-item">
                    <a href="{{ url('/' . $post->category->slug . '/' . $post->slug) }}">
                        {{ $post->title }}
                    </a>
                    <span class="text-muted d-block small">
                        Published on {{ $post->published_at->format('F j, Y') }}
                    </span>
                </li>
            @endforeach
        </ul>
    </div>
@endif
