<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>

        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="bg-light text-dark">
        <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <header class="mb-4 text-center">
                <svg class="mb-3" width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 6.75L4.5 7 12 3.5 19.5 7 12 8.75zM2 12l10 5 10-5v5l-10 5-10-5v-5zm10 3.25L4.5 14 12 10.5 19.5 14 12 15.25z"></path>
                </svg>
                <h1 class="fw-bold">Welcome to Laravel</h1>
            </header>

            <main class="w-100">
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="shadow-sm card">
                            <div class="card-body">
                                <h2 class="h4">Documentation</h2>
                                <p>Laravel has excellent documentation covering all aspects of the framework.</p>
                                <a href="https://laravel.com/docs" class="btn btn-primary">Read Docs</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="shadow-sm card">
                            <div class="card-body">
                                <h2 class="h4">Laracasts</h2>
                                <p>Watch thousands of video tutorials on Laravel, PHP, and JavaScript.</p>
                                <a href="https://laracasts.com" class="btn btn-primary">Explore Laracasts</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="shadow-sm card">
                            <div class="card-body">
                                <h2 class="h4">Laravel News</h2>
                                <p>Stay updated with the latest Laravel ecosystem news, tutorials, and package releases.</p>
                                <a href="https://laravel-news.com" class="btn btn-primary">Read News</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="shadow-sm card">
                            <div class="card-body">
                                <h2 class="h4">Vibrant Ecosystem</h2>
                                <p>Explore Laravel’s powerful tools like Forge, Nova, and more.</p>
                                <a href="https://forge.laravel.com" class="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer class="mt-5 text-center">
                <p class="text-muted">Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})</p>
            </footer>
        </div>

        <!-- Bootstrap JS Bundle -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </body>
</html>
