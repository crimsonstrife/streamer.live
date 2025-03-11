@props(['title' => __('Confirm Password'), 'content' => __('For your security, please confirm your password to continue.'), 'button' => __('Confirm')])

@php
    $confirmableId = md5($attributes->wire('then'));
@endphp

<span
    {{ $attributes->wire('then') }}
    x-data
    x-ref="span"
    x-on:click="$wire.startConfirmingPassword('{{ $confirmableId }}')"
    x-on:password-confirmed.window="setTimeout(() => $event.detail.id === '{{ $confirmableId }}' && $refs.span.dispatchEvent(new CustomEvent('then', { bubbles: false })), 250);"
>
    {{ $slot }}
</span>

@once
<!-- Password Confirmation Modal -->
<div class="modal fade" id="confirmPasswordModal" tabindex="-1" aria-labelledby="confirmPasswordModalLabel" aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="text-white modal-header bg-primary">
                <h5 class="modal-title" id="confirmPasswordModalLabel">{{ $title }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="text-muted">{{ $content }}</p>

                <div class="mt-3">
                    <label for="confirmable_password" class="form-label">{{ __('Password') }}</label>
                    <input type="password" id="confirmable_password" class="form-control"
                           placeholder="{{ __('Enter your password') }}"
                           autocomplete="current-password"
                           x-ref="confirmable_password"
                           wire:model="confirmablePassword"
                           wire:keydown.enter="confirmPassword">

                    <x-input-error for="confirmablePassword" class="mt-2" />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" wire:click="stopConfirmingPassword">
                    {{ __('Cancel') }}
                </button>
                <button type="button" class="btn btn-primary" dusk="confirm-password-button" wire:click="confirmPassword">
                    {{ $button }}
                </button>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('livewire:load', function () {
        window.addEventListener('showConfirmPasswordModal', () => {
            var confirmModal = new bootstrap.Modal(document.getElementById('confirmPasswordModal'));
            confirmModal.show();
        });
    });
</script>
@endonce