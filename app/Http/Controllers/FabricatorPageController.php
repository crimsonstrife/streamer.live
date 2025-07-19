<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use RuntimeException;
use Z3d0X\FilamentFabricator\Facades\FilamentFabricator;
use Z3d0X\FilamentFabricator\Layouts\Layout;
use Z3d0X\FilamentFabricator\Models\Contracts\Page;
use Z3d0X\FilamentFabricator\Services\PageRoutesService;

class FabricatorPageController extends Controller
{
    public function __invoke(Request $request, ?string $slug = null): string
    {
        $uri = '/'.ltrim($request->path(), '/');

        /** @var PageRoutesService $routesService */
        $routesService = resolve(PageRoutesService::class);

        /** @var Page|null $page */
        $page = $routesService->getPageFromUri($uri);

        if (! $page) {
            abort(404);
        }

        // Get the layout class from the layout name
        $layout = FilamentFabricator::getLayoutFromName($page->layout);

        if (! $layout || ! is_subclass_of($layout, Layout::class)) {
            throw new RuntimeException("Filament Fabricator: Layout \"{$page->layout}\" not found or invalid.");
        }

        // Get Blade component class to render the layout (e.g. `store-product`)
        $component = $layout::getComponent();

        // Get layout data (like `product`, `collection`, etc.)
        $data = method_exists($layout, 'getData')
            ? $layout::getData($page)
            : [];

        // Merge page into the view data
        $viewData = [
            'page' => $page,
            'component' => $component,
            ...$data,
        ];

        // Render using x-dynamic-component for flexibility
        return Blade::render(
            <<<'BLADE'
    <x-dynamic-component
    :component="$component"
    :page="$page"
    :product="$product ?? null"
    :collection="$collection ?? null"
    />
    BLADE,
            [
                'component' => $component,
                'page' => $page,
                'viewData' => $data,
                'attributes' => [],
            ]
        );

    }
}
