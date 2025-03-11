@props(['id', 'maxWidth'])

@php
$id = $id ?? md5($attributes->wire('model'));

$maxWidth = [
    'sm' => 'modal-sm',
    'md' => '',
    'lg' => 'modal-lg',
    'xl' => 'modal-xl',
    '2xl' => 'modal-xl', // Bootstrap doesn't have 2xl, so using xl
][$maxWidth ?? 'xl'];
@endphp

<!-- Bootstrap Modal -->
<div class="modal fade" id="{{ $id }}" tabindex="-1" aria-labelledby="{{ $id }}Label" aria-hidden="true" wire:ignore.self>
    <div class="modal-dialog {{ $maxWidth }}">
        <div class="modal-content">
            {{ $slot }}
        </div>
    </div>
</div>

@push('scripts')
<script>
    document.addEventListener('livewire:load', function () {
        window.addEventListener('showModal-{{ $id }}', () => {
            var modal = new bootstrap.Modal(document.getElementById('{{ $id }}'));
            modal.show();
        });

        window.addEventListener('hideModal-{{ $id }}', () => {
            var modalEl = document.getElementById('{{ $id }}');
            var modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) {
                modal.hide();
            }
        });
    });
</script>
@endpush