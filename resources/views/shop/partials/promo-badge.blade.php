@aware(['page', 'orderPromotions', 'productPromotions'])
{{-- ITEM-SPECIFIC BADGES --}}
@php
    $product = $product ?? null;
    $applied = $productPromotions->filter(fn($p) => $p->products->contains('id', $product->id));
@endphp

@if($applied->isNotEmpty())
    <div class="mb-3">
        @foreach($applied as $promo)
            @php
                $badgeClasses = match(true) {
                  $promo->title === 'TWITCHSUB'           => 'badge d-inline-flex align-items-center badge-twitch',
                  $promo->type === 'SHOP_AUTO_APPLYING'   => 'badge bg-info text-dark',
                  default                                 => 'badge bg-success',
                };
            @endphp

            <span class="{{ $badgeClasses }} me-1">
                                                    @if($promo->title === 'TWITCHSUB')
                    <x-fab-twitch class="me-1" style="font-size:0.9em;" />
                @endif

                {!! $promo->customer_message !!}
                                                </span>
        @endforeach
    </div>
@endif
