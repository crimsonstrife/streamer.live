<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl fw-semibold text-dark">
            Shopping Cart
        </h2>
    </x-slot>
    @php use App\Models\StoreObjects\Promotion;use App\Settings\FourthwallSettings;$settings = app(FourthwallSettings::class); @endphp
    @php
        $orderPromotions = Promotion::live()->entireOrder()->get();
        $productPromotions = Promotion::live()->selectedProducts()->with('products')->get();
    @endphp
    @if (! $settings->enable_integration)
        <div class="alert alert-warning text-center">
            <strong>Store is currently disabled.</strong>
            Please come back later!
        </div>
    @else
        @php
            $shopPrefix =  App\Utilities\ShopHelper::getShopSlug();
        @endphp
        <div class="py-4">
            <div class="container">
                {{-- ORDER-WIDE PROMOS --}}
                @if($orderPromotions->isNotEmpty())
                    <div class="mb-4">
                        @foreach($orderPromotions as $promo)
                            @php
                                $wrapper = match(true) {
                                  $promo->title === 'TWITCHSUB'           => 'alert d-flex align-items-center bg-twitch text-white',
                                  $promo->type  === 'SHOP_AUTO_APPLYING'  => 'alert alert-info d-flex align-items-center',
                                  default                                 => 'alert alert-success d-flex align-items-center',
                                };
                            @endphp
                            <div class="{{ $wrapper }}">
                                @if($promo->title === 'TWITCHSUB')
                                    <x-fab-twitch class="me-2" width="1rem"/>
                                @endif
                                {!! $promo->customer_message !!}
                            </div>
                        @endforeach
                        <div class="text-muted small">
                            (You’ll enter any coupon codes at checkout.)
                        </div>
                    </div>
                @endif
                <div class="shadow-sm card">
                    <div class="card-body">
                        @if ($cart && count($cart['items']) > 0)
                            <form action="{{ route($shopPrefix.'.cart.update') }}" method="POST">
                                @csrf
                                <table class="table align-middle table-bordered">
                                    <thead class="table-light">
                                    <tr>
                                        <th>Product</th>
                                        <th>Variant</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @php
                                        $cartTotal = new App\Models\ValueObjects\MoneyValue(0, 'USD');
                                    @endphp
                                    @foreach ($cart['items'] as $item)
                                        @php
                                            $variantId = $item->variant->id;
                                            $mediaItem = $item->variant->product->getMedia('images')->first();
                                        @endphp
                                        @php
                                            $applied = $productPromotions->filter(fn($p) => $p->products->contains('id', $item->variant->product->id));
                                        @endphp
                                        <tr>
                                            <td class="d-flex align-items-center">
                                                <a href="{{ route('shop.product', ['slug' => $item->variant->product->slug]) }}"
                                                   style="text-decoration: none; color: inherit;">
                                                    @if ($mediaItem)
                                                        <img src="{{ $mediaItem->getUrl() }}"
                                                             alt="{{ $mediaItem->getCustomProperty('image_alt_text') ?? 'Product image' }}"
                                                             class="rounded me-3"
                                                             width="60"
                                                             height="60">
                                                    @endif
                                                </a>
                                                <a href="{{ route('shop.product', ['slug' => $item->variant->product->slug]) }}"
                                                   style="text-decoration: none; color: inherit;">
                                                    {{ $item->variant->name }}
                                                </a>
                                            </td>
                                            <td>{{ $item->variant->name }}</td>
                                            <td>
                                                <span>{{ $item->variant->symbol_price }} USD</span>
                                            </td>
                                            <td>
                                                <input type="number" name="cart[{{ $variantId }}][quantity]"
                                                       value="{{ $item->quantity }}" min="1"
                                                       class="text-center form-control w-50">
                                            </td>
                                            <td>
                                                <span>{{ $item->variant->price->multiply($item->quantity)->symbolFormatted() }}
                                                USD</span>
                                                @foreach($applied as $promo)
                                                    @php
                                                        $badgeCls = match(true) {
                                                          $promo->title === 'TWITCHSUB'           => 'badge d-inline-flex align-items-center badge-twitch',
                                                          $promo->type  === 'SHOP_AUTO_APPLYING'  => 'badge bg-info text-dark',
                                                          default                                  => 'badge bg-success',
                                                        };
                                                    @endphp
                                                    <span class="{{ $badgeCls }} ms-2">
                                                        @if($promo->title === 'TWITCHSUB')
                                                            <x-fab-twitch class="me-1" width="1rem"/>
                                                        @endif
                                                        {!! $promo->customer_message !!}
                                                    </span>
                                                @endforeach
                                            </td>
                                            <td>
                                                <a href="{{ route($shopPrefix.'.cart.remove', $variantId) }}"
                                                   class="btn btn-danger btn-sm">
                                                    <x-fas-trash-can height="1rem" width="auto"/>
                                                    Remove
                                                </a>
                                            </td>
                                        </tr>
                                        @php
                                            $lineTotal = $item->variant->price->multiply($item->quantity);
                                            $cartTotal = $cartTotal->sum($lineTotal);
                                        @endphp
                                    @endforeach
                                    <tr class="fw-bold">
                                        <td colspan="4" class="text-end">Cart Total:</td>
                                        <td colspan="2">
                                            {{ $cartTotal->symbolFormatted() }} USD
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                                <div class="mt-4 d-flex justify-content-between">
                                    <a href="{{ route($shopPrefix.'.page') }}" class="btn btn-secondary">
                                        <x-fas-arrow-left height="1rem" width="auto"/>
                                        Continue Shopping
                                    </a>
                                    <button type="submit" class="btn btn-primary">
                                        <x-fas-arrows-rotate height="1rem" width="auto"/>
                                        Update Cart
                                    </button>
                                    <a href="{{ route($shopPrefix.'.cart.checkout') }}" class="btn btn-success">
                                        <x-fas-cash-register height="1rem" width="auto"/>
                                        Proceed to Checkout
                                    </a>
                                </div>
                            </form>
                        @else
                            <p class="text-center text-muted fs-5">Your cart is empty.</p>
                            <div class="text-center">
                                <a href="{{ route($shopPrefix.'.page') }}" class="btn btn-primary">
                                    <x-fas-shop height="1rem" width="auto"/>
                                    Go to Shop
                                </a>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    @endif
</x-app-layout>
