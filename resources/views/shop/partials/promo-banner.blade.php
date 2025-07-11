@aware(['page', 'orderPromotions', 'productPromotions'])
{{-- PROMOTION BANNERS --}}
@if($orderPromotions->isNotEmpty())
    <div class="mb-4">
        @foreach($orderPromotions as $promo)
            @php
                // Compute the wrapper classes
                $wrapperClasses = match(true) {
                  $promo->title === 'TWITCHSUB'                      => 'alert d-flex align-items-center bg-twitch text-white',
                  $promo->type === 'SHOP_AUTO_APPLYING'              => 'alert alert-info d-flex align-items-center',
                  default                                            => 'alert alert-success d-flex align-items-center',
                };
            @endphp

            <div class="{{ $wrapperClasses }}">
                {{-- Twitch icon only for TWITCHSUB --}}
                @if($promo->title === 'TWITCHSUB')
                    <x-fab-twitch class="me-2" width="1rem" />
                @endif

                {!! $promo->customer_message !!}
            </div>
        @endforeach
    </div>
@endif
