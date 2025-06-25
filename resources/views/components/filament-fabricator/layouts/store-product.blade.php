@props(['page','product'])
@php
    $layout = get_class($page);
    $variant = $layout::getHeaderVariant();
    $productMedia = $product->getMedia('images');
    $category = $product->categories()->first();
    $categoryName = $category !== null ? $category->name : '';
    $data = [
        'page'        => $page,
        'post'        => $product,
        'title'       => $product->name,
        'description' => Str::limit(strip_tags($product->description), 160),
        'keywords'    => $product->tags->pluck('name')->implode(', '),
        'image'       => $productMedia[0]->getUrl() ?? null,
        'imageAlt'    => $productMedia[0]->getCustomProperty('image_alt_text') ?? null,
        'author'      => '',
        'type'        => 'product',
        'category'    => $categoryName,
        'date'        => $product->created_at->toIso8601String(),
    ];
@endphp
{!! App\View\Helpers\LayoutSection::header($variant, $data) !!}


<!-- Page Content -->
<main class="flex-grow-1">
    <div class="container py-4">
        <x-ui.breadcrumb :items="App\View\Helpers\Breadcrumb::forPage($page->title)"/>
        <x-filament-fabricator::page-blocks :blocks="$page->blocks"/>
    </div>
</main>
</div> <!-- Tag match is actually contained in the header, pulled in via LayoutSection::header() -->
@stack('modals')
{!! App\View\Helpers\LayoutSection::footer($layout::getFooterVariant()) !!}

