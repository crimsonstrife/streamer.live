<?php

namespace App\Forms\Components;

use App\Models\Icon;
use Filament\Forms\Components\Field;
use Illuminate\Support\HtmlString;

class IconPicker extends Field
{
    protected string $view = 'forms.components.icon-picker';

    // Default page size:
    protected int $perPage = 60;

    public ?int $selectedIcon = null;

    /**
     * Called after the field's state has been hydrated.
     * We'll stash the current icon ID so the view can highlight it.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->afterStateHydrated(function () {
            $this->selectedIcon = $this->getState();
        });
    }

    /**
     * Prepare all of the data our Blade needs.
     */
    protected function getViewData(): array
    {
        // First batch of icons, server‐side paginated
        $paginator = Icon::query()
            ->orderBy('name')
            ->paginate($this->perPage);

        return array_merge(parent::getViewData(), [
            'initialIcons' => [
                'data' => $paginator->items(),
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
            ],
            'fetchUrl' => route('icons.fetch'),   // your JSON endpoint
            'types' => Icon::types(),          // cached [ 'heroicon' => 'Heroicons', … ]
            'styles' => Icon::styles(),         // cached [ 'outline' => 'Outline', … ]
            'selected' => $this->selectedIcon,    // for initial highlight
        ]);
    }

    /**
     * When the user picks an icon in the JS layer,
     * Alpine will dispatch a `change` event with the ID.
     * Filament’s wiring will call this.
     */
    public function updateState($state): void
    {
        $this->state($state);
    }

    /**
     * Utility to render a single icon’s SVG—delegated to your model.
     */
    public function renderIconSvg(int $iconId): ?HtmlString
    {
        $icon = Icon::find($iconId);

        return $icon
            ? new HtmlString($icon->svg_url ?? $icon->svg_code)
            : null;
    }
}
