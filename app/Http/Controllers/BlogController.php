<?php

namespace App\Http\Controllers;

use App\Models\BlogObjects\Post;
use App\Traits\HasCacheSupport;
use App\Utilities\BlogHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Z3d0X\FilamentFabricator\Facades\FilamentFabricator;
use Z3d0X\FilamentFabricator\Layouts\Layout;
use Z3d0X\FilamentFabricator\Services\PageRoutesService;

/**
 * Class BlogController
 *
 * Handles the rendering of blog pages, including the blog index and individual blog posts.
 */
class BlogController extends Controller
{
    use HasCacheSupport;

    /**
     * Displays the blog index page.
     *
     * This is rendered fresh on every request, so the request / session-aware UI
     * (auth menu, cookie banners, etc.) stays accurate.
     *
     * @param  Request  $request  The incoming HTTP request.
     * @return string The rendered blog index page.
     */
    public function index(Request $request): string
    {
        return $this->renderIndex($request);
    }

    /**
     * Renders the blog index page.
     *
     * Retrieves the page data and renders it using the appropriate layout and Blade component.
     *
     * @param  Request  $request  The incoming HTTP request.
     * @return string The rendered blog index page.
     *
     * @throws HttpException If the page or layout is not found.
     */
    private function renderIndex(Request $request): string
    {
        $slug = BlogHelper::getBlogSlug();
        $uri = '/' . ltrim($slug, '/');

        $page = app(PageRoutesService::class)->getPageFromUri($uri);
        abort_unless($page, 404);

        $layout = FilamentFabricator::getLayoutFromName($page->layout);
        abort_unless($layout && is_subclass_of($layout, Layout::class), 500);

        $component = $layout::getComponent();
        $data = method_exists($layout, 'getData') ? $layout::getData($page) : [];

        return Blade::render(
            <<<'BLADE'
                <x-dynamic-component :component="$component" :page="$page" />
            BLADE,
            array_merge(
                ['component' => $component, 'page' => $page],
                $data
            )
        );
    }

    /**
     * Displays a specific blog post.
     *
     * Only the post model data is cached. The final rendered page is generated
     * fresh on every request, so the auth / session / cookie-aware UI remains correct.
     *
     * @param  Request  $request  The incoming HTTP request.
     * @param  string  $slug  The slug of the blog post.
     * @return string The rendered blog post.
     */
    public function show(Request $request, string $slug): string
    {
        $post = $this->rememberTagged(
            ['blog', "post:$slug"],
            "post.model:$slug",
            fn () => Post::with(['author', 'tags', 'comments.replies'])
                ->whereSlug($slug)
                ->firstOrFail()
        );

        return $this->renderPost($slug, $post);
    }

    /**
     * Renders a specific blog post.
     *
     * Retrieves the page data and renders it using the appropriate layout and Blade component.
     *
     * @param  string  $slug  The slug of the blog post.
     * @param  Post  $post  The resolved blog post model.
     * @return string The rendered blog post.
     *
     * @throws HttpException If the page or layout is not found.
     */
    private function renderPost(string $slug, Post $post): string
    {
        $postPageSlug = BlogHelper::getBlogSlug() . '/post';
        $page = app(PageRoutesService::class)->getPageFromUri('/' . $postPageSlug);
        abort_unless($page, 404);

        $layout = FilamentFabricator::getLayoutFromName($page->layout);
        abort_unless($layout && is_subclass_of($layout, Layout::class), 500);

        $component = $layout::getComponent();
        $data = method_exists($layout, 'getData')
            ? $layout::getData($page, ['slug' => $slug, 'post' => $post])
            : [];

        return Blade::render(
            <<<'BLADE'
                <x-dynamic-component :component="$component" :page="$page" :post="$post" />
            BLADE,
            array_merge(
                ['component' => $component, 'page' => $page, 'post' => $post],
                $data
            )
        );
    }
}
