<?php

$builtinIconsRoot = 'public/build/assets/icons/included';
$customIconsRoot = 'public/build/assets/icons/custom';
$customIconsClasses = 'custom-icon-set custom-icon';

return [

    'sets' => [

        'fontawesome-regular' => [
            'path' => $builtinIconsRoot.'/fontawesome/regular',
            'prefix' => 'far',
            'class' => 'fa-icon-set far-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'fontawesome-solid' => [
            'path' => $builtinIconsRoot.'/fontawesome/solid',
            'prefix' => 'fas',
            'class' => 'fa-icon-set fas-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'fontawesome-brands' => [
            'path' => $builtinIconsRoot.'/fontawesome/brands',
            'prefix' => 'fab',
            'class' => 'fa-icon-set fab-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'fontawesome-duotone' => [
            'path' => $builtinIconsRoot.'/fontawesome/duotone',
            'prefix' => 'fad',
            'class' => 'fa-icon-set fad-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'fontawesome-thin' => [
            'path' => $builtinIconsRoot.'/fontawesome/thin',
            'prefix' => 'fat',
            'class' => 'fa-icon-set fat-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'fontawesome-light' => [
            'path' => $builtinIconsRoot.'/fontawesome/light',
            'prefix' => 'fal',
            'class' => 'fa-icon-set fal-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'heroicon-outline' => [
            'path' => $builtinIconsRoot.'/heroicon/outline',
            'prefix' => 'heroo',
            'class' => 'hero-icon-set heroo-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'none',
                'stroke' => 'currentColor',
            ],
        ],

        'heroicon-solid' => [
            'path' => $builtinIconsRoot.'/heroicon/solid',
            'prefix' => 'heros',
            'class' => 'hero-icon-set heros-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'octicon-regular' => [
            'path' => $builtinIconsRoot.'/octicon/regular',
            'prefix' => 'octir',
            'class' => 'octi-icon-set octir-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'octicon-solid' => [
            'path' => $builtinIconsRoot.'/octicon/solid',
            'prefix' => 'octis',
            'class' => 'octi-icon-set octis-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'octicon-outline' => [
            'path' => $builtinIconsRoot.'/octicon/outline',
            'prefix' => 'octio',
            'class' => 'octi-icon-set octio-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'none',
                'stroke' => 'currentColor',
            ],
        ],

        'octicon-brands' => [
            'path' => $builtinIconsRoot.'/octicon/brands',
            'prefix' => 'octib',
            'class' => 'octi-icon-set octib-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'misc' => [
            'path' => $builtinIconsRoot.'/misc',
            'prefix' => 'misc',
            'class' => 'misc-icon-set misc-icon',
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'custom-solid' => [
            'path' => $customIconsRoot.'/solid',
            'prefix' => 'custom-s',
            'class' => $customIconsClasses,
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'custom-regular' => [
            'path' => $customIconsRoot.'/regular',
            'prefix' => 'custom-r',
            'class' => $customIconsClasses,
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'custom-brands' => [
            'path' => $customIconsRoot.'/brands',
            'prefix' => 'custom-b',
            'class' => $customIconsClasses,
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'custom-duotone' => [
            'path' => $customIconsRoot.'/duotone',
            'prefix' => 'custom-dt',
            'class' => $customIconsClasses,
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'custom-thin' => [
            'path' => $customIconsRoot.'/thin',
            'prefix' => 'custom-t',
            'class' => $customIconsClasses,
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'custom-light' => [
            'path' => $customIconsRoot.'/light',
            'prefix' => 'custom-l',
            'class' => $customIconsClasses,
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],

        'custom-outline' => [
            'path' => $customIconsRoot.'/outline',
            'prefix' => 'custom-o',
            'class' => $customIconsClasses,
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'none',
                'stroke' => 'currentColor',
            ],
        ],

        'custom-custom' => [
            'path' => $customIconsRoot.'/custom',
            'prefix' => 'custom-c',
            'class' => $customIconsClasses,
            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],
        ],
    ],

    'class' => 'icons',

    'attributes' => [
        'width' => 50,
        'height' => 50,
        'fill' => 'none',
        'stroke' => 'currentColor',
    ],

    'fallback' => 'far-notdef',

    'components' => [
        'disabled' => false,
        'default' => 'icon-component',
    ],
];
