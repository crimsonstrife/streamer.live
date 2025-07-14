{{-- footer.blade.php --}}
@props(['page','post'])
<div class="container">
    <footer class="py-5">
        <div class="row">
            <div class="col-6 col-md-2 mb-3">
                <h5></h5>
                <x-filament-menu menu="footer-nav-1"/>
            </div>

            <div class="col-6 col-md-2 mb-3">
                <h5></h5>
                <x-filament-menu menu="footer-nav-2"/>
            </div>

            <div class="col-6 col-md-2 mb-3">
                <h5></h5>
                <x-filament-menu menu="footer-nav-3"/>
            </div>

            <div class="col-md-5 offset-md-1 mb-3">
                <form action="{{ route('newsletter.subscribe') }}" method="POST">
                    @csrf
                    <h5>Subscribe to the newsletter</h5>
                    <p>Keep up with what's new and exciting.</p>
                    <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                        <label for="newsletter-email" class="visually-hidden">Email address</label>
                        <input id="newsletter-email" name="email" type="email" class="form-control" placeholder="Email address" required>
                        <button class="btn btn-primary" type="button">Subscribe</button>
                    </div>
                </form>
                <p class="mt-3 small">
                    Already subscribed, but changed your mind? <a href="{{ route('newsletter.unsubscribe.form') }}">Unsubscribe</a>.
                </p>
            </div>
        </div>

        <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <span class="flex-sm-row justify-content-between">
                <a href="{{ route('fabricator.page.home') }}"
                   class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
                    <x-application-logo height="40"/>
                </a>
            </span>
            <x-copyright />
            <span>
                @include('partials._socials', ['limit' => 4])
            </span>
        </div>
    </footer>
</div>
@livewireScripts

<!-- Page Specific Scripts -->
@stack('scripts')

    {{-- TinyMCE --}}
    @if (file_exists(public_path('vendor/tinymce/tinymce.min.js')))
        <script src="{{ asset('vendor/tinymce/tinymce.min.js') }}" referrerpolicy="origin"></script>
    @endif

</body> <!-- Tag match is actually contained in the the page file, which includes this file via LayoutSection::footer() -->
</html>  <!-- Tag match is actually contained in the the page file, which includes this file via LayoutSection::footer() -->
