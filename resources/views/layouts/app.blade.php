@props(['page'])
{!! App\View\Helpers\LayoutSection::header() !!}

        <!-- Page Content -->
        <main class="flex-grow-1">
            <div class="container py-4">
                {{ $slot }}
            </div>
        </main>
</div> <!-- Tag match is actually contained in the header, pulled in via LayoutSection::header() -->

    @stack('modals')
{!! App\View\Helpers\LayoutSection::footer() !!}
