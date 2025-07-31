<?php

namespace App\Http\Controllers\Installer;

use Illuminate\Routing\Controller;
use Froiden\LaravelInstaller\Helpers\RequirementsChecker;
use Illuminate\View\View;

class RequirementsController extends Controller
{

    /**
     * @var RequirementsChecker
     */
    protected $requirements;

    /**
     * @param RequirementsChecker $checker
     */
    public function __construct(RequirementsChecker $checker)
    {
        $this->requirements = $checker;
    }

    /**
     * Display the requirements page.
     *
     * @return View
     */
    public function requirements()
    {
        $phpSupportInfo = $this->requirements->checkPHPversion(
            config('installer.core.minPhpVersion')
        );

        $requirements = $this->requirements->check(
            config('installer.requirements')
        );

        return view('vendor.installer.requirements', compact('requirements', 'phpSupportInfo'));
    }
}
