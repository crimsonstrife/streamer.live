@props(['style' => session('flash.bannerStyle', 'success'), 'message' => session('flash.banner')])

@if (!empty($message))
    <div x-data="{ show: true, style: '{{ $style }}', message: '{{ $message }}' }"
         x-init="if (!message) show = false" {{-- Ensure the banner doesn't show if message is empty --}}
         x-show="show && message"
         x-transition
         class="alert d-flex align-items-center alert-dismissible fade show"
         :class="{
            'alert-success': style === 'success',
            'alert-danger': style === 'danger',
            'alert-warning': style === 'warning',
            'alert-secondary': !['success', 'danger', 'warning'].includes(style)
         }"
         role="alert">

        <!-- Icon Section -->
        <span class="me-2">
            <template x-if="style === 'success'">
                <i class="bi bi-check-circle-fill"></i>
            </template>
            <template x-if="style === 'danger'">
                <i class="bi bi-exclamation-circle-fill"></i>
            </template>
            <template x-if="style === 'warning'">
                <i class="bi bi-exclamation-triangle-fill"></i>
            </template>
            <template x-if="!['success', 'danger', 'warning'].includes(style)">
                <i class="bi bi-info-circle-fill"></i>
            </template>
        </span>

        <!-- Message Text -->
        <span x-text="message"></span>

        <!-- Close Button -->
        <button type="button" class="btn-close ms-auto" x-on:click="show = false" aria-label="Close"></button>
    </div>
@endif