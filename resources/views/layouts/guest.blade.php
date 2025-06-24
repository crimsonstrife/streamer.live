@props(['page','post'])
@php
    $data = compact(
        'page','post','title','description',
        'keywords','image','author',
        'type','category','date'
    );
@endphp
{!! App\View\Helpers\LayoutSection::header(null, $data) !!}

<!-- Page Content -->
<main class="flex-grow-1">
    <div class="container py-4">
        {{ $slot }}
    </div>
</main>
</div> <!-- Tag match is actually contained in the header, pulled in via LayoutSection::header() -->

@stack('modals')
{!! App\View\Helpers\LayoutSection::footer() !!}
