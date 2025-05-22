<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Newsletter\Facades\Newsletter;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        if (Newsletter::isSubscribed($request->email)) {
            return back()->with('error', 'You’re already signed up.');
        }

        Newsletter::subscribe($request->email);

        return back()->with('success', 'Thanks for subscribing!');
    }

    /** Show a simple “enter your email to unsubscribe” form */
    public function showUnsubscribeForm()
    {
        return view('newsletter.unsubscribe');
    }

    /** Process the unsubscribe request */
    public function unsubscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        if (! Newsletter::isSubscribed($request->email)) {
            return back()->with('error', 'That address is not subscribed.');
        }

        Newsletter::unsubscribe($request->email);

        return back()->with('success', 'You’ve been unsubscribed.');
    }
}
