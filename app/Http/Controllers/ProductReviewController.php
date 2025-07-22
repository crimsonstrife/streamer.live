<?php

namespace App\Http\Controllers;

use App\Models\StoreObjects\Product;
use App\Models\StoreObjects\ProductReview;
use App\Traits\HasCacheSupport;
use Blaspsoft\Blasp\Facades\Blasp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Purifier;
use Throwable;

class ProductReviewController extends Controller
{
    use HasCacheSupport;

    public function store(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:1000|min:1',
        ]);

        $user = $request->user();

        try {
            $review = new ProductReview;
            $isVerified = $review->verifyPurchase($user->id, $product->id);

            $cleanReview = Purifier::clean($validated['review'], 'default');

            $blasp = Blasp::check($cleanReview);

            $cleanReview = $blasp->getCleanString();

            ProductReview::create([
                'product_id' => $product->id,
                'user_id' => $user->id,
                'rating' => $validated['rating'],
                'review' => $cleanReview,
                'is_verified' => $isVerified,
            ]);

            // Invalidate product page cache to reflect new review
            $this->flushTagged([
                'shop',
                "product:{$product->slug}",
            ]);

            return back()->with('success', 'Thank you for your review!');
        } catch (Throwable $e) {
            Log::error('Product review creation failed', [
                'product_id' => $product->id,
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'There was a problem submitting your review.');
        }
    }
}
