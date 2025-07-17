@php
    $settings    = app(\App\Settings\SiteSettings::class);
    $siteName    = $settings->site_name ?? config('app.name', 'Streamer.live');
    $showName    = $settings->show_site_name;
    $logoHeight  = 50;
    $logoWidth   = null;
    $style = app(\App\Settings\LookFeelSettings::class);
    $display_mode = $style->mode;
@endphp
<div class="d-flex flex-column min-vh-100 justify-content-center align-items-center {{ $display_mode === 'auto' ? 'bg-auto' : 'bg-'.$display_mode }}">
    <div class="w-100" style="max-width: 80%;">
        <div class="shadow-sm card">
            <div class="card-body">
                {{ $slot }}
            </div>
        </div>
    </div>
</div>
