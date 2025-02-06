<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            {{ $page->title }}
        </h2>
    </x-slot>

    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p class="text-gray-600">{{ $page->excerpt }}</p>
        <div class="prose max-w-none">
            {!! $page->content !!}
        </div>
        @foreach($page->blocks as $block)
            @if($block->type === 'text')
                <p class="mt-4 text-gray-700">{{ $block->content['text'] }}</p>
            @elseif($block->type === 'image')
                <img src="{{ $block->content['url'] }}" class="w-full mt-4 rounded">
            @elseif($block->type === 'embed')
                <iframe src="{{ $block->content['embed_url'] }}" class="w-full h-64 mt-4"></iframe>
            @endif
        @endforeach
    </div>
</x-app-layout>
