<div>
    <div class="shadow-sm card border-danger">
        <div class="text-white card-header bg-danger">
            {{ __('Delete Account') }}
        </div>

        <div class="card-body">
            <p class="text-muted">
                {{ __('Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.') }}
            </p>

            <div class="mt-4">
                <button class="btn btn-danger" wire:click="confirmUserDeletion" wire:loading.attr="disabled">
                    {{ __('Delete Account') }}
                </button>
            </div>
        </div>
    </div>

    <!-- Delete User Confirmation Modal -->
    <div wire:ignore.self class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="text-white modal-header bg-danger">
                    <h5 class="modal-title" id="deleteUserModalLabel">{{ __('Delete Account') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <p>
                        {{ __('Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.') }}
                    </p>

                    <div class="mt-3">
                        <label for="password" class="form-label">{{ __('Password') }}</label>
                        <input type="password" class="form-control" id="password" wire:model="password" autocomplete="current-password" placeholder="{{ __('Enter your password') }}">
                        <x-input-error for="password" />
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ __('Cancel') }}
                    </button>
                    <button type="button" class="btn btn-danger" wire:click="deleteUser" wire:loading.attr="disabled">
                        {{ __('Delete Account') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    @push('scripts')
    <script>
        Livewire.on('confirmingUserDeletion', () => {
            var deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
            deleteUserModal.show();
        });
    </script>
    @endpush
</div>