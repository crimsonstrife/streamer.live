@aware(['orderPromotions'])
@php
    $settings = app(\App\Settings\FourthwallSettings::class);
@endphp

@if (! $settings->enable_integration)
    <div class="filament-alert filament-alert-warning">
        <strong>Warning:</strong> Fourthwall integration is disabled.
        Please enable it in
        <a href="{{ route('filament.admin.integrations.pages.fourthwall-settings') }}">
            Fourthwall Settings
        </a>
        before using the Promotion Banner.
    </div>
@else
    @if($orderPromotions->isNotEmpty())
        <div class="mb-4">
            @foreach($orderPromotions as $promo)
                @php
                    $wrapper = match(true) {
                      $promo->title === 'TWITCHSUB'           => 'alert d-flex align-items-center bg-twitch text-white',
                      $promo->type  === 'SHOP_AUTO_APPLYING'  => 'alert alert-info d-flex align-items-center',
                      default                                  => 'alert alert-success d-flex align-items-center',
                    };
                @endphp

                <div class="{{ $wrapper }} mb-2">
                    @if($promo->title === 'TWITCHSUB')
                        <x-fab-twitch class="me-2" width="1rem" />
                    @endif
                    {!! $promo->customer_message !!}
                </div>
            @endforeach

            <div class="text-muted small">
                (Coupon codes are applied at checkout on Fourthwall.)
            </div>
        </div>
    @endif
@endif
