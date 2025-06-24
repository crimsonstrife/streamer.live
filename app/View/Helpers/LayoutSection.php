<?php

namespace App\View\Helpers;

use Illuminate\Support\Facades\View;
use Throwable;

class LayoutSection
{
    /**
     * @throws Throwable
     */
    public static function header(?string $variant = null, array $data = []): string
    {
        $view = $variant ? "partials.header-{$variant}" : 'partials.header';

        return View::exists($view)
            ? view($view, $data)->render()
            : view('partials.header', $data)->render();
    }

    /**
     * @throws Throwable
     */
    public static function footer(?string $variant = null, array $data = []): string
    {
        $view = $variant ? "partials.footer-{$variant}" : 'partials.footer';

        return View::exists($view)
            ? view($view, $data)->render()
            : view('partials.footer', $data)->render();
    }
}
