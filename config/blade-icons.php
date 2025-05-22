<?php

const BUILTIN_ICONS_ROOT = 'public/build/assets/icons/included';
const CUSTOM_ICONS_ROOT = 'public/build/assets/icons/custom';
const CUSTOM_ICONS_CLASSES = 'custom-icon-set custom-icon';

return [

    /*
    |--------------------------------------------------------------------------
    | Icons Sets
    |--------------------------------------------------------------------------
    |
    | With this config option you can define a couple of
    | default icon sets. Provide a key name for your icon
    | set and a combination from the options below.
    |
    */

    'sets' => [

        'fontawesome-regular' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/fontawesome/regular',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'far',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'fa-icon-set far-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'fontawesome-solid' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/fontawesome/solid',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'fas',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'fa-icon-set fas-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'fontawesome-brands' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/fontawesome/brands',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'fab',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'fa-icon-set fab-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'fontawesome-duotone' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/fontawesome/duotone',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'fad',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'fa-icon-set fad-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'fontawesome-thin' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/fontawesome/thin',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'fat',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'fa-icon-set fat-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'fontawesome-light' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/fontawesome/light',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'fal',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'fa-icon-set fal-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'heroicon-outline' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/heroicon/outline',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'heroo',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'hero-icon-set heroo-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'none',
                'stroke' => 'currentColor',
            ],

        ],
        'heroicon-solid' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/heroicon/solid',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'heros',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'hero-icon-set heros-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'octicon-regular' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/octicon/regular',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'octir',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'octi-icon-set octir-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'octicon-solid' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/octicon/solid',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'octis',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'octi-icon-set octis-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'octicon-outline' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/octicon/outline',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'octio',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'octi-icon-set octio-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'none',
                'stroke' => 'currentColor',
            ],

        ],
        'octicon-brands' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/octicon/brands',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'octib',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'octi-icon-set octib-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'misc' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => BUILTIN_ICONS_ROOT.'/misc',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'public',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'misc',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'misc-icon-set misc-icon',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'custom-solid' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => CUSTOM_ICONS_ROOT.'/solid',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'local',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'custom-s',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'CUSTOM_ICONS_CLASSES',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'custom-regular' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => CUSTOM_ICONS_ROOT.'/regular',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'local',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'custom-r',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'CUSTOM_ICONS_CLASSES',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'custom-brands' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => CUSTOM_ICONS_ROOT.'/brands',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'local',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'custom-b',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'CUSTOM_ICONS_CLASSES',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'custom-duotone' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => CUSTOM_ICONS_ROOT.'/duotone',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'local',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'custom-dt',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'CUSTOM_ICONS_CLASSES',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'custom-thin' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => CUSTOM_ICONS_ROOT.'/thin',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'local',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'custom-t',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'CUSTOM_ICONS_CLASSES',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'custom-light' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => CUSTOM_ICONS_ROOT.'/light',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'local',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'custom-l',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'CUSTOM_ICONS_CLASSES',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
        'custom-outline' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => CUSTOM_ICONS_ROOT.'/outline',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'local',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'custom-o',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'CUSTOM_ICONS_CLASSES',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'none',
                'stroke' => 'currentColor',
            ],

        ],
        'custom-custom' => [

            /*
            |-----------------------------------------------------------------
            | Icons Path
            |-----------------------------------------------------------------
            |
            | Provide the relative path from your app root to your SVG icons
            | directory. Icons are loaded recursively so there's no need to
            | list every sub-directory.
            |
            | Relative to the disk root when the disk option is set.
            |
            */

            'path' => CUSTOM_ICONS_ROOT.'/custom',

            /*
            |-----------------------------------------------------------------
            | Filesystem Disk
            |-----------------------------------------------------------------
            |
            | Optionally, provide a specific filesystem disk to read
            | icons from. When defining a disk, the "path" option
            | starts relatively from the disk root.
            |
            */

            // 'disk' => 'local',

            /*
            |-----------------------------------------------------------------
            | Default Prefix
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a default prefix for
            | your icons. The dash separator will be applied automatically
            | to every icon name. It's required and needs to be unique.
            |
            */

            'prefix' => 'custom-c',

            /*
            |-----------------------------------------------------------------
            | Fallback Icon
            |-----------------------------------------------------------------
            |
            | This config option allows you to define a fallback
            | icon when an icon in this set cannot be found.
            |
            */

            // 'fallback' => '',

            /*
            |-----------------------------------------------------------------
            | Default Set Classes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some classes which
            | will be applied by default to all icons within this set.
            |
            */

            'class' => 'CUSTOM_ICONS_CLASSES',

            /*
            |-----------------------------------------------------------------
            | Default Set Attributes
            |-----------------------------------------------------------------
            |
            | This config option allows you to define some attributes which
            | will be applied by default to all icons within this set.
            |
            */

            'attributes' => [
                'width' => 50,
                'height' => 50,
                'fill' => 'currentColor',
                'stroke' => 'currentColor',
            ],

        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Global Default Classes
    |--------------------------------------------------------------------------
    |
    | This config option allows you to define some classes which
    | will be applied by default to all icons.
    |
    */

    'class' => 'icons',

    /*
    |--------------------------------------------------------------------------
    | Global Default Attributes
    |--------------------------------------------------------------------------
    |
    | This config option allows you to define some attributes which
    | will be applied by default to all icons.
    |
    */

    'attributes' => [
        'width' => 50,
        'height' => 50,
        'fill' => 'none',
        'stroke' => 'currentColor',
    ],

    /*
    |--------------------------------------------------------------------------
    | Global Fallback Icon
    |--------------------------------------------------------------------------
    |
    | This config option allows you to define a global fallback
    | icon when an icon in any set cannot be found. It can
    | reference any icon from any configured set.
    |
    */

    'fallback' => 'far-notdef',

    /*
    |--------------------------------------------------------------------------
    | Components
    |--------------------------------------------------------------------------
    |
    | These config options allow you to define some
    | settings related to Blade Components.
    |
    */

    'components' => [

        /*
        |----------------------------------------------------------------------
        | Disable Components
        |----------------------------------------------------------------------
        |
        | This config option allows you to disable Blade components
        | completely. It's useful to avoid performance problems
        | when working with large icon libraries.
        |
        */

        'disabled' => false,

        /*
        |----------------------------------------------------------------------
        | Default Icon Component Name
        |----------------------------------------------------------------------
        |
        | This config option allows you to define the name
        | for the default Icon class component.
        |
        */

        'default' => 'icon-component',

    ],

];
