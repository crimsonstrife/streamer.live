<x-app-layout>
    <x-slot name="header">
        <h2 class="h4 text-dark">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-5">
        <div class="container">
            <div class="card shadow-lg rounded">
                <div class="card-body">
                    <x-welcome />
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
