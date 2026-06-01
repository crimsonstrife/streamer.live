<?php

namespace App\Http\Controllers;

use App\Models\StoreObjects\FourthwallGiveawayLink;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Str;

class OpeningGiftController extends Controller
{
    public function __invoke(string $giftId): View
    {
        abort_unless(Str::startsWith($giftId, 'gft_'), 404);

        $gift = FourthwallGiveawayLink::query()
            ->with(['product.images', 'package.product.images'])
            ->where('provider_id', $giftId)
            ->first();

        $product = $gift?->product ?? $gift?->package?->product;
        $redirectUrl = $gift?->link ?? $this->fallbackGiftUrl($giftId);

        return view('shop.opening-gift', [
            'gift' => $gift,
            'giftId' => $giftId,
            'product' => $product,
            'redirectUrl' => $redirectUrl,
            'redirectDelay' => $gift ? 1600 : 2400,
        ]);
    }

    private function fallbackGiftUrl(string $giftId): string
    {
        return 'https://fourthwall.com/gifts/'.$giftId;
    }
}
