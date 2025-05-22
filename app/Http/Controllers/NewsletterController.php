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
}
