<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ $post->title }}
        </h2>
    </x-slot>

    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav class="mb-4 text-sm text-gray-500">
            <a href="{{ route('blog') }}" class="text-blue-600 hover:underline">{{ config('cms.posts_page_slug', 'Blog') }}</a> >
            <a href="{{ route('blog.category', ['categorySlug' => $post->category->slug]) }}" class="text-blue-600 hover:underline">
                {{ $post->category->name }}
            </a> >
            <span>{{ $post->title }}</span>
        </nav>

        <p class="text-gray-500">Published on {{ $post->published_at->format('F j, Y') }}</p>
        <p class="text-gray-600">{{ $post->excerpt }}</p>
        <div class="prose max-w-none">
            {!! $post->content !!}
        </div>
    </div>
</x-app-layout>
