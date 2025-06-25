@props(['page'])
@php
    use App\Models\StoreObjects\Product;
        $layout = get_class($page);
        $variant = $layout::getHeaderVariant();
        $product = Product::latest('created_at')->first();
        $productMedia = $product->getMedia('images');
        $category = $product->categories()->first();
        $categoryName = $category !== null ? $category->name : '';
        $data = [
            'page'        => $page,
            'post'        => $product,
            'title'       => 'Store Catalog',
            'description' => 'Products and Services',
            'keywords'    => $product->tags()->pluck('name')->implode(', '),
            'image'       => isset($productMedia[0]) ? $productMedia[0]->getUrl() : null,
            'imageAlt'    => isset($productMedia[0]) ? $productMedia[0]->getCustomProperty('image_alt_text') : null,
            'author'      => '',
            'type'        => 'store',
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

