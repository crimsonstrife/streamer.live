<?php

namespace App\Forms\Components;

use App\Models\Icon;
use Exception;
use Filament\Forms\Components\Field;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\HtmlString;
use RuntimeException;

class IconPicker extends Field
{
    public bool $showPicker = false;

    public $selectedIcon = null; // This is the state to toggle the picker modal

    public bool $required = false; // This is the selected icon - null when no icon is selected

    protected string $view = 'forms.components.icon-picker'; // This is the required state of the field

    // Optional: If you want to load all icons into the field

    public function getIcons($page = 1, $perPage = 60)
    {
        // Initialize the icon model
        // Load only a limited subset of icons per request
        // Return the loaded icons
        return (new Icon)->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Toggle the visibility of the picker modal.
     */
    public function togglePicker(): void
    {
        $this->showPicker = ! $this->showPicker;
    }

    /**
     * Get the Types of the icons.
     */
    public function getTypes()
    {
        // Load types from the database or from a file (as per your project)
        return (new Icon)->loadTypes();
    }

    /**
     * Get the Styles of the icons.
     */
    public function getStyles()
    {
        // Load styles from the database or from a file (as per your project)
        return (new Icon)->loadStyles();
    }

    /**
     * Get the css class of the icon.
     */
    public function getIconClass($icon): string
    {
        // Load icon class from the database or from a file (as per your project)
        $iconModel = new Icon;

        // make sure that the icon is an instance of the Icon model
        if ($icon instanceof Icon) {
            return $iconModel->getStyleClass($icon);
        }

        // log an error if the icon is not an instance of the Icon model
        Log::error('The icon is not an instance of the Icon model.');

        // return an empty string if the icon is not an instance of the Icon model
        return '';
    }

    /**
     * Get the icon SVG.
     * Returns the SVG file path, or the SVG code - else a null value.
     *
     * @param  Icon|int  $icon  - The icon object or icon id.
     */
    public function getIconSvg(Icon|int $icon): HtmlString|string|null
    {
        // Initialize the SVG variable
        $svg = null;

        // make sure that the icon is an instance of the Icon model
        if ($icon instanceof Icon) {
            // Get the icon SVG
            $svg = $icon->getSvg($icon);
        } elseif (is_int($icon)) {
            // If the icon is an integer, assume it's an icon id and attempt to load the icon from the database
            $iconModel = new Icon;
            $icon = $iconModel->findOrFail($icon);

            // Get the icon SVG
            $svg = $icon->getSvg($icon);
        }

        // Check if the SVG is not empty
        if (! empty($svg)) {
            // Check if the model priority is set to file
            if ($icon->isFile($icon)) {
                // Return the SVG file path
                return new HtmlString($svg);
            }

            // Return the SVG code
            return $svg;
        }

        // log an error if the icon is not an instance of the Icon model
        Log::error('The icon is not an instance of the Icon model.');

        // return null if the icon is not an instance of the Icon model
        return null;
    }

    /**
     * Is the current icon a file?
     * Returns a boolean value indicating if the icon is a file.
     *
     * @param  Icon|int  $icon  - The icon object or icon id.
     */
    public function isFile(Icon|int $icon): bool
    {
        // make sure that the icon is an instance of the Icon model
        if ($icon instanceof Icon) {
            return $icon->isFile($icon);
        }

        if (is_int($icon)) {
            // If the icon is an integer, assume it's an icon id and attempt to load the icon from the database
            $iconModel = new Icon;
            $icon = $iconModel->findOrFail($icon);

            return $icon->isFile($icon);
        }

        // log an error if the icon is not an instance of the Icon model
        Log::error('The icon is not an instance of the Icon model.');

        // return false if the icon is not an instance of the Icon model
        return false;
    }

    /**
     * Get the icon associated with the current model.
     * Returns the icon object, or a null value, if no icon is associated.
     * Checks the model for an icon attribute to check the icon id, and returns the icon object if found.
     *
     * @param  $model  - The model to check for the icon attribute.
     *
     * @throws Exception
     */
    public function getIcon($model): ?Icon
    {
        // Check if the model has an icon attribute
        try {
            if (isset($model->icon)) {
                // Load the icon from the database or from a file (as per your project)
                return (new Icon)->find($model->icon);
            }
        } catch (Exception $e) {
            // log an error if the icon is not found
            Log::error('The icon is not found.');
            throw new RuntimeException('The icon is not found.');
        }

        // return null if the model has no icon attribute
        return null;
    }

    /**
     * Emit the icon updated event.
     */
    public function emitIconUpdated($iconId): void
    {
        $this->emit('iconUpdated', $iconId);
    }
}
