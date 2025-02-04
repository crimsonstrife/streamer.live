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
    </div>
</x-app-layout>
