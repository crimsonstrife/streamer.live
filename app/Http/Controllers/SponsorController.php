<?php

namespace App\Http\Controllers;

use App\Models\SponsorObjects\Donation;
use App\Models\SponsorObjects\Goal;
use App\Services\StripeCheckoutService;
use App\Settings\StripeSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use RuntimeException;
use Throwable;

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
            ->orderByDesc('amount')
            ->paginate(5);

        return view('sponsor.show', compact('goal', 'donors'));
    }

    public function checkout(Request $request, string $slug)
    {
        $goal = Goal::where('slug', $slug)->firstOrFail();

        if (! $goal->is_active) {
            abort(404);
        }

        $settings = app(StripeSettings::class);

        if (! $settings->enable_integration) {
            return redirect()
                ->route('sponsor.show', $goal->slug)
                ->with('error', 'Sponsorship checkout is temporarily unavailable. Please try again later.');
        }

        $data = $request->validate([
            'amount' => ['required', 'numeric', "min:{$settings->min_donation}", "max:{$settings->max_donation}"],
            'donor_name' => ['nullable', 'string', 'max:120'],
            'donor_email' => [Rule::requiredIf(fn () => ! $request->user()), 'nullable', 'email', 'max:190'],
            'is_anonymous' => ['sometimes', 'boolean'],
            'message' => ['nullable', 'string', 'max:500'],
        ]);

        try {
            $stripe = app(StripeCheckoutService::class);
            $session = $stripe->createSession($goal, $data, $request->user());
        } catch (RuntimeException $e) {
            Log::warning('Stripe checkout unavailable', ['message' => $e->getMessage()]);

            return redirect()
                ->route('sponsor.show', $goal->slug)
                ->withInput()
                ->with('error', 'Sponsorship checkout is temporarily unavailable. Please try again later.');
        } catch (Throwable $e) {
            Log::error('Stripe checkout failed', ['exception' => $e]);

            return redirect()
                ->route('sponsor.show', $goal->slug)
                ->withInput()
                ->with('error', 'We could not start your checkout. Please try again in a moment.');
        }

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
