@props(['page'])
@php
    $layout = get_class($page);
        $variant = $layout::getHeaderVariant();
        $data = [
            'page'        => $page,
            'post'        => null,
            'title'       => $page->title,
            'description' => Str::limit(strip_tags($page->seo_description), 160),
            'keywords'    => $page->tags->pluck('name')->implode(', '),
            'image'       => null,
            'imageAlt'    => null,
            'author'      => '',
            'type'        => 'page',
            'category'    => $page->type,
            'date'        => $page->created_at->toIso8601String(),
        ];
@endphp
{!! App\View\Helpers\LayoutSection::header($variant, $data) !!}

    <!-- Page Content -->
    <main class="flex-grow-1">
        <div class="container py-4">
            <x-filament-fabricator::page-blocks :blocks="$page->blocks" />
        </div>
    </main>
</div> <!-- Tag match is actually contained in the header, pulled in via LayoutSection::header() -->
@stack('modals')
{!! App\View\Helpers\LayoutSection::footer($layout::getFooterVariant()) !!}
