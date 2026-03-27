<p class="mt-5 mb-3 text-body-secondary">
    @php
        $siteOwner =  "CrimsonStrife"; // TODO: set this up to be configurable before release
    @endphp
    <span id="copyright-span" class="copyright">
        <p>Powered by <a
                href="https://getstreamer.live">Streamer.live</a> © 2025 <?php if (date('Y') > date('Y', strtotime('2025'))) {
                    echo ' - '.date('Y');
                } ?> by {{ $siteOwner }}, All rights reserved.</p>
    </span>
</p>
