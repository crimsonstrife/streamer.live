<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class EncryptCookies extends Middleware
{
    /**
     * The names of the cookies that should not be encrypted.
     *
     * @var array<int, string>
     */
    protected $except = [
        // Laravel default (keep this unencrypted for JS frameworks, etc.)
        'XSRF-TOKEN',

        // Cookies not set by Laravel (avoid decryption failures/noise)
        '_shieldon',
        'streamerlive_cookie_consent',
    ];
}
