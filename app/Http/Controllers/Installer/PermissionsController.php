<?php

namespace App\Http\Controllers\Installer;

use App\Http\Requests;
use Illuminate\Routing\Controller;
use Froiden\LaravelInstaller\Helpers\PermissionsChecker;
use Illuminate\View\View;

class PermissionsController extends Controller
{

    /**
     * @var PermissionsChecker
     */
    protected $permissions;

    /**
     * @param PermissionsChecker $checker
     */
    public function __construct(PermissionsChecker $checker)
    {
        $this->permissions = $checker;
    }

    /**
     * Display the permissions check page.
     *
     * @return View
     */
    public function permissions()
    {
        $permissions = $this->permissions->check(
            config('installer.permissions')
        );

        return view('vendor.installer.permissions', compact('permissions'));
    }
}
