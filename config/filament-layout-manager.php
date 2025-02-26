<?php

// config for Asosick/FilamentLayoutManager
use Asosick\FilamentLayoutManager\Http\Livewire\LayoutManager;
use Asosick\FilamentLayoutManager\Pages\LayoutManagerPage;

return [
    /**
     * Points to the LayoutManager livewire component in use.
     * This class wraps your components and allowes you to manipulate them on the page
     */
    'layout_manager' => LayoutManager::class,

    /**
     * Header of LayoutManager Page
     */
    'heading' => 'Test Page',

    /**
     * Enclose your new page within a filament page.
     */
    'wrap_in_filament_page' => false,

    /**
     * Parameters passed from LayoutManagerPage -> LayoutManager to define its properties.
     */
    'settings' => [
        /**
         * Livewire components that can be selected by the user.
         */
        'components' => [],

        /**
         * Defines the options present in the selection box. Must match your provided components.
         */
        'select_options' => [],

        /**
         * Columns allowed in the grid.
         */
        'grid_columns' => 2,

        /**
         * Display the lock/unlock button.
         */
        'show_lock_button' => true,

        /**
         * Number of layout views users can customize
         */
        'layout_count' => 3,
    ],
];
