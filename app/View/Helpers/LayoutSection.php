<?php

namespace App\View\Helpers;

use Illuminate\Support\Facades\View;
use Throwable;

class LayoutSection
{
    /**
     * @throws Throwable
     */
    public static function header(?string $variant = null): string
    {
        $view = $variant ? "partials.header-{$variant}" : 'partials.header';

        return View::exists($view)
            ? view($view)->render()
            : view('partials.header')->render();
    }

    /**
     * @throws Throwable
     */
    public static function footer(?string $variant = null): string
    {
        $view = $variant ? "partials.footer-{$variant}" : 'partials.footer';

        return View::exists($view)
            ? view($view)->render()
            : view('partials.footer')->render();
    }
}
