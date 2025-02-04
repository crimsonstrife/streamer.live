<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ $postsPage->title ?? 'Blog' }}
        </h2>
    </x-slot>

    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p class="text-gray-600">{{ $postsPage->excerpt ?? 'Read our latest articles and updates' }}</p>

        <div class="mt-6 prose max-w-none">
            {!! $postsPage->content ?? '' !!}
        </div>

        @foreach($posts as $post)
            <div class="p-4 mt-6 bg-white rounded-lg shadow">
                <h3 class="text-xl font-semibold">
                    <a href="{{ route('blog.post', ['category' => $post->category->slug, 'postSlug' => $post->slug]) }}" class="text-blue-600 hover:underline">
                        {{ $post->title }}
                    </a>
                </h3>
                <p class="text-sm text-gray-500">
                    Published on {{ $post->published_at->format('F j, Y') }} in
                    <a href="{{ route('blog.category', ['categorySlug' => $post->category->slug]) }}" class="text-blue-600 hover:underline">
                        {{ $post->category->name }}
                    </a>
                </p>
                <p class="mt-2 text-gray-700">{{ $post->excerpt }}</p>
                <a href="{{ route('blog.post', ['category' => $post->category->slug, 'postSlug' => $post->slug]) }}" class="text-blue-500 hover:underline">
                    Read more →
                </a>
            </div>
        @endforeach

        <div class="mt-6">
            {{ $posts->links() }}
        </div>
    </div>
</x-app-layout>
