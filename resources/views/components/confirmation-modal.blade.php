@props(['id' => null, 'maxWidth' => null])

<x-modal :id="$id" :maxWidth="$maxWidth" {{ $attributes }}>
    <div class="text-white modal-header bg-danger">
        <h5 class="modal-title">
            {{ $title }}
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
        <div class="d-flex align-items-start">
            <div class="flex-shrink-0 p-3 bg-opacity-25 d-flex align-items-center justify-content-center rounded-circle bg-danger me-3">
                <i class="bi bi-exclamation-triangle-fill text-danger fs-4"></i>
            </div>
            <div>
                <p class="text-muted">
                    {{ $content }}
                </p>
            </div>
        </div>
    </div>

    <div class="modal-footer bg-light">
        {{ $footer }}
    </div>
</x-modal>