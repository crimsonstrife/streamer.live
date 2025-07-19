<?php

namespace App\Http\Controllers;

use App\Models\StoreObjects\Collection;
use App\Models\StoreObjects\Product;
use App\Services\FourthwallService;
use App\Settings\FourthwallSettings;
use App\Traits\HasCacheSupport;
use App\Utilities\CartHelper;
use App\Utilities\ShopHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Throwable;
use Z3d0X\FilamentFabricator\Facades\FilamentFabricator;
use Z3d0X\FilamentFabricator\Layouts\Layout;
use Z3d0X\FilamentFabricator\Models\Contracts\Page;
use Z3d0X\FilamentFabricator\Services\PageRoutesService;

class StoreController extends Controller
{
    use HasCacheSupport;

    protected FourthwallService $fourthwallService;

    protected CartHelper $cartHelper;

    public function __construct(FourthwallService $fourthwallService, CartHelper $cartHelper)
    {
        if (! app(FourthwallSettings::class)->enable_integration) {
            abort(404);
        }
        $this->fourthwallService = $fourthwallService;
        $this->cartHelper = $cartHelper;
    }

    /**
     * Optional: Used for global header cart item count or AJAX responses.
     */
    public function getCartItemCount(): int
    {
        return $this->cartHelper->getCartItemCount();
    }

    /**
     * Return product details JSON for optional use in product blocks.
     */
    public function fetchProduct($slug)
    {
        $product = Product::with('images', 'variants')->where('slug', $slug)->firstOrFail();

        return response()->json($product);
    }

    /**
     * Return collection details and its products.
     */
    public function fetchCollection($slug)
    {
        $collection = Collection::where('slug', $slug)
            ->with(['products' => fn ($query) => $query->with('images', 'variants')])
            ->firstOrFail();

        return response()->json($collection);
    }

    // Optional fallback if needed in legacy routes
    public function redirectToShop()
    {
        // Detect the Fabricator shop page slug dynamically or fallback
        $shopSlug = ShopHelper::getShopSlug(); // custom helper

        return redirect()->to("/{$shopSlug}");
    }

    /**
     * Show the store homepage with all collections.
     */
    public function index(): string
    {
        return $this->rememberTagged(
            ['shop', 'shop:index'],
            'shop:index',
            fn () => $this->renderIndex()
        );
    }

    /**
     * @throws Throwable
     */
    private function renderIndex(): string
    {
        $shopSlug = ShopHelper::getShopSlug();
        $collections = Collection::all();

        return view($shopSlug.'.index', [
            'collections' => $collections,
        ])->render();
    }

    public function product(Request $request, string $slug): string
    {
        return $this->rememberTagged(
            ['shop', "product:$slug"],
            "product:$slug",
            fn () => $this->renderProduct($slug)
        );
    }

    private function renderProduct(string $slug): string
    {
        $pageSlug = ShopHelper::getShopSlug().'/'.ShopHelper::getProductSlug();
        $page = app(PageRoutesService::class)->getPageFromUri('/'.$pageSlug);
        abort_unless($page, 404);

        $layout = FilamentFabricator::getLayoutFromName($page->layout);
        abort_unless($layout && is_subclass_of($layout, Layout::class), 500);

        $component = $layout::getComponent();
        $data = method_exists($layout, 'getData') ? $layout::getData($page, ['slug' => $slug]) : [];

        return Blade::render(
            <<<'BLADE'
<x-dynamic-component
    :component="$component"
    :page="$page"
    :product="$product ?? null"
    :slug="$slug"
/>
BLADE,
            array_merge(['component' => $component, 'page' => $page, 'slug' => $slug], $data)
        );
    }

    public function collection(Request $request, string $slug): string
    {
        return $this->rememberTagged(
            ['shop', "collection:$slug"],
            "collection:$slug",
            fn () => $this->renderCollection($slug)
        );
    }

    private function renderCollection(string $slug): string
    {
        $pageSlug = ShopHelper::getShopSlug().'/'.ShopHelper::getCollectionSlug();
        $page = app(PageRoutesService::class)->getPageFromUri('/'.$pageSlug);
        abort_unless($page, 404);

        $layout = FilamentFabricator::getLayoutFromName($page->layout);
        abort_unless($layout && is_subclass_of($layout, Layout::class), 500);

        $component = $layout::getComponent();
        $data = method_exists($layout, 'getData') ? $layout::getData($page, ['slug' => $slug]) : [];

        return Blade::render(
            <<<'BLADE'
<x-dynamic-component
    :component="$component"
    :page="$page"
    :collection="$collection ?? null"
    :slug="$slug"
/>
BLADE,
            array_merge(['component' => $component, 'page' => $page, 'slug' => $slug], $data)
        );
    }
}
