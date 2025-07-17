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
    @include('shop.partials.promo-banner')
@endif
