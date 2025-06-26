@props(['page'])
@php
    $layout = get_class($page);
    $variant = $layout::getHeaderVariant();
    $product = $collection->products()->first();
    $productMedia = $product ? $product->getMedia('images') : collect(); // Ensure $product is not null
    $category = $product ? $product->categories()->first() : null;
    $categoryName = $category !== null ? $category->name : '';
    $keywords = collect()
        ->merge($product ? $product->tags->pluck('name') : []) // Ensure $product->tags doesn't throw an error
        ->merge($page->tags->pluck('name') ?? []) // Collect tags from the page (if available)
        ->unique() // Remove duplicate tags
        ->implode(', '); // Convert to a comma-separated string

        $data = [
            'page'        => $page,
            'post'        => $collection,
            'title'       => $collection->name ?? $page->seo_title ?? $page->title,
            'description' => Str::limit(strip_tags($collection->description), 160) ?? Str::limit(strip_tags($page->seo_description), 160) ?? 'Products and Services',
            'keywords'    => $keywords,
            'image'       => $productMedia->isNotEmpty() ? $productMedia[0]->getUrl() : null,
        'imageAlt'    => $productMedia->isNotEmpty() ? $productMedia[0]->getCustomProperty('image_alt_text') : null,
            'author'      => '',
            'type'        => 'collection',
            'category'    => $categoryName,
            'date'        => $collection->created_at->toIso8601String(),
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

