<div class="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-light">
    <div class="mb-4">
        {{ $logo }}
    </div>

    <div class="w-100" style="max-width: 400px;">
        <div class="shadow-sm card">
            <div class="card-body">
                {{ $slot }}
            </div>
        </div>
    </div>
</div>