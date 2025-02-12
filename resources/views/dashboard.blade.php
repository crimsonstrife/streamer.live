<x-app-layout>
    <x-slot name="header">
        <h2 class="h4 fw-semibold text-dark">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-5">
        <div class="container">
            <div class="shadow-sm card">
                <div class="card-body">
                    <x-welcome />
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
