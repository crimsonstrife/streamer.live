<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-bs-theme="auto">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        window.livewireToken = "{{ csrf_token() }}";
    </script>
    {!! seo() !!}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    @livewireStyles

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="font-sans antialiased bg-light">
    <x-banner />

    <div class="container-fluid min-vh-100">
        @livewire('navigation-menu')

        <!-- Page Heading -->
        @if (isset($header))
            <header class="py-3 bg-white shadow-sm">
                <div class="container">
                    <h2 class="h4">{{ $header }}</h2>
                </div>
            </header>
        @endif

        <!-- Page Content -->
        <main class="container mt-4">
            {{ $slot }}
        </main>
    </div>

    @stack('modals')

    <!-- Ensure Livewire has access to the CSRF token -->
    <script>
        window.csrfToken = '{{ csrf_token() }}';
        if (typeof Livewire !== 'undefined') {
            Livewire.on('csrf', () => {
                Livewire.emit('setToken', '{{ csrf_token() }}');
            });
        }
    </script>

    @livewireScripts

    <!-- Bootstrap JS Bundle (includes Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Livewire Sortable -->
    <script src="https://cdn.jsdelivr.net/gh/livewire/sortable@v1.x.x/dist/livewire-sortable.js"></script>

    <script>
        Livewire.on('csrfError', () => {
            console.error('Livewire CSRF error detected!');
        });

        // Ensure Livewire requests always include the CSRF token
        window.addEventListener('livewire:load', () => {
            Livewire.hook('message.sent', (message, component) => {
                message.payload.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')
                    .content;
            });
        });
    </script>
</body>

</html>
