<x-app-layout>
    <x-slot name="header">
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
            Redirecting to Checkout...
        </h2>
    </x-slot>

    <div class="flex items-center justify-center min-h-screen">
        <p class="text-lg text-gray-700">You are being redirected to checkout...</p>
    </div>

    <script>
        window.location.href = "{{ session('checkout_url') }}";
    </script>
</x-app-layout>
