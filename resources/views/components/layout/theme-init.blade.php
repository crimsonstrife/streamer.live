@props(['default' => 'light'])
<script>
    (function () {
        var key = 'streamer.theme';
        var fallback = @json($default);
        var stored = localStorage.getItem(key);
        var value = (stored === 'light' || stored === 'dark' || stored === 'auto') ? stored : fallback;
        var resolved = value === 'auto'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : value;
        document.documentElement.setAttribute('data-bs-theme', resolved);
        document.documentElement.dataset.themeDefault = fallback;
    })();
</script>
