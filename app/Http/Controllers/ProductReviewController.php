<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductReview;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProductReviewController extends Controller
{
    public function store(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:1000',
        ]);

        $user = auth()->user();

        $isVerified = $product->variants()
            ->whereHas('orderItems.order', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->exists();

        ProductReview::create([
            'product_id' => $product->id,
            'user_id' => $user->id,
            'rating' => $validated['rating'],
            'review' => $validated['review'],
            'is_verified' => $isVerified,
        ]);

        return back()->with('success', 'Thank you for your review!');
    }
}
