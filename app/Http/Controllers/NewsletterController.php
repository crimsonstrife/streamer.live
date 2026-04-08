<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Newsletter\Facades\Newsletter;

class NewsletterController extends Controller
{
    public function showUnsubscribeForm(): View
    {
        return view('newsletter.unsubscribe');
    }

    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
        ]);

        if ($validator->fails()) {
            return redirect($this->newsletterRedirectTarget($request))
                ->withErrors($validator, 'newsletterSubscribe')
                ->withInput();
        }

        if (Newsletter::isSubscribed($request->email)) {
            return redirect($this->newsletterRedirectTarget($request))
                ->with('newsletter_error', 'You’re already signed up.')
                ->withInput();
        }

        Newsletter::subscribe($request->email);

        return redirect($this->newsletterRedirectTarget($request))
            ->with('newsletter_success', 'Thanks for subscribing!');
    }

    public function unsubscribe(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        if (! Newsletter::isSubscribed($request->email)) {
            return redirect()
                ->route('newsletter.unsubscribe.form')
                ->with('error', 'That address is not subscribed.')
                ->withInput();
        }

        Newsletter::unsubscribe($request->email);

        return redirect()
            ->route('newsletter.unsubscribe.form')
            ->with('success', 'You’ve been unsubscribed.');
    }

    protected function newsletterRedirectTarget(Request $request): string
    {
        $target = $request->string('redirect_to')->toString();

        if (blank($target)) {
            return url()->previous();
        }

        if (str_starts_with($target, url('/'))) {
            return $target;
        }

        return url('/');
    }
}
