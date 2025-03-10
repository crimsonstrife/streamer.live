@props(['style' => session('flash.bannerStyle', 'success'), 'message' => session('flash.banner')])

<div x-data="{ show: true, style: '{{ $style }}', message: '{{ $message }}' }"
     x-show="show && message"
     x-transition
     class="alert d-flex align-items-center alert-dismissible fade show"
     :class="{
        'alert-success': style === 'success',
        'alert-danger': style === 'danger',
        'alert-warning': style === 'warning',
        'alert-secondary': style !== 'success' && style !== 'danger' && style !== 'warning'
    }"
     role="alert">

    <span class="me-2">
        <i x-show="style === 'success'" class="bi bi-check-circle-fill"></i>
        <i x-show="style === 'danger'" class="bi bi-exclamation-circle-fill"></i>
        <i x-show="style === 'warning'" class="bi bi-exclamation-triangle-fill"></i>
        <i x-show="style !== 'success' && style !== 'danger' && style !== 'warning'" class="bi bi-info-circle-fill"></i>
    </span>

    <span x-text="message"></span>

    <button type="button" class="btn-close ms-auto" x-on:click="show = false" aria-label="Close"></button>
</div>
