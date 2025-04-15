@props(['page'])
{!! App\View\Helpers\LayoutSection::header() !!}

        @livewire('navigation-menu')
        <!-- Page Content -->
        <main class="flex-grow-1">
            <div class="container py-4">
                {{ $slot }}
            </div>
        </main>
    </div>

    @stack('modals')
{!! App\View\Helpers\LayoutSection::footer() !!}
