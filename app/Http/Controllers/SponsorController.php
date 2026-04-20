<?php

namespace App\Http\Controllers;

use App\Models\SponsorObjects\Donation;
use App\Models\SponsorObjects\Goal;
use App\Services\StripeCheckoutService;
use App\Settings\StripeSettings;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SponsorController extends Controller
{
    public function index()
    {
        $goals = Goal::active()
            ->orderBy('sort_order')
            ->orderByDesc('published_at')
            ->paginate(12);

        return view('sponsor.index', compact('goals'));
    }

    public function show(string $slug)
    {
        $goal = Goal::where('slug', $slug)->published()->firstOrFail();

        $donors = $goal->succeededDonations()
            ->latest('paid_at')
            ->paginate(20);

        $messages = $goal->succeededDonations()
            ->withApprovedMessage()
            ->latest('paid_at')
            ->take(25)
            ->get();

        return view('sponsor.show', compact('goal', 'donors', 'messages'));
    }

    public function checkout(Request $request, string $slug, StripeCheckoutService $stripe)
    {
        $goal = Goal::where('slug', $slug)->firstOrFail();

        if (! $goal->is_active) {
            abort(404);
        }

        $settings = app(StripeSettings::class);

        $data = $request->validate([
            'amount' => ['required', 'numeric', "min:{$settings->min_donation}", "max:{$settings->max_donation}"],
            'donor_name' => ['nullable', 'string', 'max:120'],
            'donor_email' => [Rule::requiredIf(fn () => ! $request->user()), 'nullable', 'email', 'max:190'],
            'is_anonymous' => ['sometimes', 'boolean'],
            'message' => ['nullable', 'string', 'max:500'],
        ]);

        $session = $stripe->createSession($goal, $data, $request->user());

        return redirect()->away($session->url);
    }

    public function success(Request $request)
    {
        $donation = null;

        if ($sessionId = $request->query('session_id')) {
            $donation = Donation::where('stripe_checkout_session_id', $sessionId)->first();
        }

        return view('sponsor.success', compact('donation'));
    }

    public function cancel()
    {
        return view('sponsor.cancel');
    }
}
