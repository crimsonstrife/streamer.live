<x-app-layout>
    <x-slot name="header">
        <h2 class="h4 text-dark">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="container py-5">
        <div class="row gy-4">
            <div class="col-lg-4">
                @include('dashboard.partials.profile-card')
                @include('dashboard.partials.notifications')
            </div>
            <div class="col-lg-8">
                @include('dashboard.partials.recent-orders')
                @include('dashboard.partials.announcements')
                @include('dashboard.partials.integrations')
            </div>
        </div>
    </div>
</x-app-layout>

