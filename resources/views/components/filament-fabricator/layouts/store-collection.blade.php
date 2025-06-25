@props(['page'])
@php
    $layout = get_class($page);
    $variant = $layout::getHeaderVariant();
    $product = $collection->products()->first();
    $productMedia = $product->getMedia('images');
    $category = $product->categories()->first();
    $categoryName = $category !== null ? $category->name : '';
        $data = [
            'page'        => $page,
            'post'        => $collection,
            'title'       => $collection->name,
            'description' => 'Products and Services',
            'keywords'    => $product->tags()->pluck('name')->implode(', '),
            'image'       => count($productMedia) > 0 ? $productMedia[0]->getUrl() : null,
            'imageAlt'    => count($productMedia) > 0 ? $productMedia[0]->getCustomProperty('image_alt_text') : null,
            'author'      => '',
            'type'        => 'collection',
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

