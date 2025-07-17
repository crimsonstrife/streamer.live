<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

/**
 * Class OnboardingController
 *
 * Controller responsible for handling onboarding-related actions for users.
 */
class OnboardingController extends Controller
{
    /**
     * Dismisses the onboarding process for the authenticated user.
     *
     * Marks the onboarding process as dismissed for the user and redirects them
     * back to the previous page with a success message.
     *
     * @param  Request  $request  The incoming HTTP request.
     * @return RedirectResponse A redirect response back to the previous page with a success message.
     */
    public function dismiss(Request $request): RedirectResponse
    {
        // Call the dismissOnboarding method on the authenticated user.
        $request->user()->dismissOnboarding();

        // Redirect back with a success message.
        return redirect()->back()->with('message', 'Onboarding dismissed.');
    }
}
