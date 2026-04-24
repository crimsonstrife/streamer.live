@php
    $settings    = app(\App\Settings\SiteSettings::class);
    $siteName    = $settings->site_name ?? config('app.name', 'Streamer.live');
    $showName    = $settings->show_site_name;
    $logoHeight  = 50;
    $logoWidth   = null;
@endphp
<div class="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-body-tertiary">
    <div class="w-100" style="max-width: 80%;">
        <div class="shadow-sm card">
            <div class="card-body">
                {{ $slot }}
            </div>
        </div>
    </div>
</div>
