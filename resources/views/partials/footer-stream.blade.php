{{-- footer-stream.blade.php — dark minimal footer for live-stream layout --}}
@props(['page' => null, 'post' => null])
<footer class="stream-footer">
    <div class="stream-footer-container">
        <a href="{{ route('fabricator.page.home') }}" class="stream-footer-brand">
            <x-application-logo height="28"/>
        </a>
        <div class="stream-footer-copy">
            <x-copyright/>
        </div>
        <div class="stream-footer-socials">
            @include('partials._socials', ['limit' => 6])
        </div>
    </div>
</footer>

<style>
    .stream-footer {
        background: var(--stream-surface, #16161b);
        border-top: 1px solid var(--stream-border, #26262d);
        color: var(--stream-muted, #8a8a93);
        padding: 16px 0;
    }
    .stream-footer-container {
        max-width: 1400px; margin: 0 auto; padding: 0 20px;
        display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    }
    .stream-footer-brand { display: inline-flex; align-items: center; }
    .stream-footer-copy { flex: 1 1 auto; font-size: 12px; }
    .stream-footer-copy, .stream-footer-copy * { color: var(--stream-muted, #8a8a93); }
    .stream-footer-socials { display: inline-flex; gap: 8px; }
    .stream-footer-socials a { color: var(--stream-muted, #8a8a93); }
    .stream-footer-socials a:hover { color: var(--color-accent, #a78bfa); }
</style>

@livewireScripts
@stack('scripts')
@if (file_exists(public_path('build/vendors/jquery/jquery.min.js')))
    <script src="{{ asset('build/vendors/jquery/jquery.min.js') }}" referrerpolicy="origin"></script>
    {{-- jQuery 4 removed $.trim, $.isArray, $.isFunction, $.proxy; polyfill for legacy plugins (e.g. TinyMCE mention). --}}
    <script>(function(j){if(!j)return;if(!j.trim)j.trim=function(s){return s==null?'':String(s).trim();};if(!j.isArray)j.isArray=Array.isArray;if(!j.isFunction)j.isFunction=function(x){return typeof x==='function';};if(!j.proxy)j.proxy=function(fn,c){var a=Array.prototype.slice.call(arguments,2);return function(){return fn.apply(c,a.concat(Array.prototype.slice.call(arguments)));};};})(window.jQuery);</script>
@endif
@if (file_exists(public_path('vendor/tinymce/tinymce.min.js')))
    <script src="{{ asset('vendor/tinymce/tinymce.min.js') }}" referrerpolicy="origin"></script>
@endif
@cookieconsentview
</body>
</html>
