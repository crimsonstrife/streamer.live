@props(['page'])
@php
    $layout = get_class($page);
@endphp
{!! App\View\Helpers\LayoutSection::header($layout::getHeaderVariant()) !!}


<!-- Page Content -->
    <main class="flex-grow-1">
        <div class="container py-4">
            <x-ui.breadcrumb :items="App\View\Helpers\Breadcrumb::forPage($page->title)"/>
            <x-filament-fabricator::page-blocks :blocks="$page->blocks"/>
        </div>
    </main>
</div>
@stack('modals')
{!! App\View\Helpers\LayoutSection::footer($layout::getFooterVariant()) !!}

