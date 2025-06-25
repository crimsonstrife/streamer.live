@props(['page'])
@php
use App\Models\BlogObjects\Post;
    $layout = get_class($page);
    $variant = $layout::getHeaderVariant();
    $post = Post::latest('published_at')->first();
    $postMedia = $post->getMedia('images');
    $data = [
        'page'        => $page,
        'post'        => $post,
        'title'       => 'Blog Index: Latest Post ->' . $post->title,
        'description' => "Blog Posts and Updates",
        'keywords'    => $post->tags->pluck('name')->implode(', '),
        'image'       => $postMedia->isNotEmpty() ? $postMedia[0]->getUrl() : null,
        'imageAlt'    => $postMedia->isNotEmpty() ? $postMedia[0]->getCustomProperty('image_alt_text') : null,
        'author'      => $post->author->name,
        'type'        => 'page',
        'category'    => $post->category->name,
        'date'        => $post->published_at->toIso8601String(),
    ];
@endphp
@push('styles')
    <style>
        .blog-header-logo {
            font-family: "Playfair Display", Georgia, "Times New Roman", serif /*rtl:Amiri, Georgia, "Times New Roman", serif*/;
            font-size: 2.25rem;
        }

        .blog-header-logo:hover {
            text-decoration: none;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: "Playfair Display", Georgia, "Times New Roman", serif /*rtl:Amiri, Georgia, "Times New Roman", serif*/;
        }

        .flex-auto {
            flex: 0 0 auto;
        }

        .h-250 {
            height: 250px;
        }

        @media (min-width: 768px) {
            .h-md-250 {
                height: 250px;
            }
        }

        /* Pagination */
        .blog-pagination {
            margin-bottom: 4rem;
        }

        /*
         * Blog posts
         */
        .blog-post {
            margin-bottom: 4rem;
        }

        .blog-post-meta {
            margin-bottom: 1.25rem;
            color: #727272;
        }
    </style>
@endpush
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
