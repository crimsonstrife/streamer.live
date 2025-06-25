@props([
    'page',
    'post',
])

@php
    $layout = get_class($page);
    $variant = $layout::getHeaderVariant();
    $postMedia = $post->getMedia('images');
    $data = [
        'page'        => $page,
        'post'        => $post,
        'title'       => $post->title,
        'description' => $post->description ?? Str::limit(strip_tags($post->content), 160),
        'keywords'    => $post->tags->pluck('name')->implode(', '),
        'image'       => $postMedia->isNotEmpty() ? $postMedia[0]->getUrl() : null,
        'imageAlt'    => $postMedia->isNotEmpty() ? $postMedia[0]->getCustomProperty('image_alt_text') : null,
        'author'      => $post->author->name,
        'type'        => 'article',
        'category'    => $post->category->name,
        'date'        => $post->published_at->toIso8601String(),
    ];
@endphp

{!! \App\View\Helpers\LayoutSection::header($variant, $data) !!}

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

