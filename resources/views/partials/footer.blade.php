{{-- footer.blade.php --}}
@props(['page'])
<div class="container">
    <footer class="py-5">
        <div class="row">
            <div class="col-6 col-md-2 mb-3">
                <h5>Section</h5>
                <x-filament-menu menu="footer-nav-1"/>
            </div>

            <div class="col-6 col-md-2 mb-3">
                <h5>Section</h5>
                <x-filament-menu menu="footer-nav-2"/>
            </div>

            <div class="col-6 col-md-2 mb-3">
                <h5>Section</h5>
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
            </div>
        </div>

        <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© <?php echo date("Y"); ?> <?php echo config('app.name') ?></p>
            <p>Powered by Streamer © 2025 <?php if(date("Y") > date("Y", strtotime("2025"))) { echo " - " . date("Y"); }; ?> by CrimsonStrife, All rights reserved.</p>
            <ul class="list-unstyled d-flex">
                <li class="ms-3"><a class="link-body-emphasis" href="#">
                        <svg class="bi" width="24" height="24">
                            <use xlink:href="#twitter"></use>
                        </svg>
                    </a></li>
                <li class="ms-3"><a class="link-body-emphasis" href="#">
                        <svg class="bi" width="24" height="24">
                            <use xlink:href="#instagram"></use>
                        </svg>
                    </a></li>
                <li class="ms-3"><a class="link-body-emphasis" href="#">
                        <svg class="bi" width="24" height="24">
                            <use xlink:href="#facebook"></use>
                        </svg>
                    </a></li>
            </ul>
        </div>
    </footer>
</div>
@livewireScripts

<!-- Page Specific Scripts -->
@stack('scripts')

</body> <!-- Tag match is actually contained in the the page file, which includes this file via LayoutSection::footer() -->
</html>  <!-- Tag match is actually contained in the the page file, which includes this file via LayoutSection::footer() -->
