@aware(['page'])
@php
    $title     = $title     ?? 'Next Stream In';
    $style     = $style     ?? 'digital';
    $targetIso = $targetIso ?? null;
    $uid       = 'next-stream-' . uniqid();

    // Normalize it: strip whitespace + lowercase
    $styleNormalized = trim(strtolower($style));

    // Determine if we're in digital mode by checking for "dig", because the full string was not matching for some reason
    $isDigital = str_starts_with($styleNormalized, 'dig');
@endphp

<div class="next-stream-countdown-block text-center" data-style="{{ $styleNormalized }}">
    <h2>{{ $title }}</h2>

    @if($targetIso)
        @if($isDigital)
            {{-- DIGITAL CLOCK --}}
            <div id="countdown-{{ $uid }}" class="h2 fw-bold"></div>
            <script>
                (function () {
                    const target = new Date('{{ $targetIso }}').getTime();
                    const el = document.getElementById('countdown-{{ $uid }}');

                    function update() {
                        let diff = target - Date.now();
                        if (diff < 0) diff = 0;
                        const d = Math.floor(diff / 86400000);
                        const h = Math.floor((diff % 86400000) / 3600000);
                        const m = Math.floor((diff % 3600000) / 60000);
                        const s = Math.floor((diff % 60000) / 1000);
                        el.textContent =
                            (d ? d + 'd ' : '') +
                            String(h).padStart(2, '0') + ':' +
                            String(m).padStart(2, '0') + ':' +
                            String(s).padStart(2, '0');
                    }

                    update();
                    setInterval(update, 1000);
                })();
            </script>
        @else
            {{-- PROGRESS BAR --}}
            <div class="progress" style="height: 1.5rem;">
                <div
                    id="bar-{{ $uid }}"
                    class="progress-bar"
                    role="progressbar"
                    style="width: 0;"
                >0%
                </div>
            </div>
            <script>
                (function () {
                    const start = Date.now();
                    const target = new Date('{{ $targetIso }}').getTime();
                    const bar = document.getElementById('bar-{{ $uid }}');

                    function update() {
                        const now = Date.now();
                        const total = target - start;
                        let remaining = target - now;
                        if (remaining < 0) remaining = 0;
                        const pct = total > 0 ? ((total - remaining) / total) * 100 : 100;
                        bar.style.width = pct + '%';
                        bar.textContent = Math.floor(pct) + '%';
                    }

                    update();
                    setInterval(update, 1000);
                })();
            </script>
        @endif
    @else
        <p class="text-muted">No upcoming streams scheduled.</p>
    @endif
</div>
