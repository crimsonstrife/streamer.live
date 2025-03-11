<div>
    <div class="shadow-sm card">
        <div class="text-white card-header bg-primary">
            {{ __('Browser Sessions') }}
        </div>

        <div class="card-body">
            <p class="text-muted">
                {{ __('Manage and log out your active sessions on other browsers and devices.') }}
            </p>

            <p class="small text-secondary">
                {{ __('If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.') }}
            </p>

            @if (count($this->sessions) > 0)
                <ul class="mt-3 list-group">
                    @foreach ($this->sessions as $session)
                        <li class="list-group-item d-flex align-items-center">
                            <div class="me-3">
                                @if ($session->agent->isDesktop())
                                    <i class="bi bi-laptop size-8 text-secondary"></i>
                                @else
                                    <i class="bi bi-phone size-8 text-secondary"></i>
                                @endif
                            </div>

                            <div>
                                <strong class="d-block">{{ $session->agent->platform() ?? __('Unknown') }} - {{ $session->agent->browser() ?? __('Unknown') }}</strong>
                                <small class="text-muted">
                                    {{ $session->ip_address }},
                                    @if ($session->is_current_device)
                                        <span class="text-success fw-bold">{{ __('This device') }}</span>
                                    @else
                                        {{ __('Last active') }} {{ $session->last_active }}
                                    @endif
                                </small>
                            </div>
                        </li>
                    @endforeach
                </ul>
            @endif

            <div class="mt-4 d-flex align-items-center">
                <button class="btn btn-primary" wire:click="confirmLogout" wire:loading.attr="disabled">
                    {{ __('Log Out Other Browser Sessions') }}
                </button>

                <span class="ms-3 text-success fw-bold" wire:loading.remove wire:target="logoutOtherBrowserSessions">
                    <x-action-message on="loggedOut">
                        {{ __('Done.') }}
                    </x-action-message>
                </span>
            </div>
        </div>
    </div>

    <!-- Log Out Other Devices Confirmation Modal -->
    <div class="modal fade" id="logoutOtherSessionsModal" tabindex="-1" aria-labelledby="logoutOtherSessionsLabel" aria-hidden="true" wire:ignore.self>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="text-white modal-header bg-primary">
                    <h5 class="modal-title" id="logoutOtherSessionsLabel">{{ __('Log Out Other Browser Sessions') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ __('Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices.') }}

                    <div class="mt-3">
                        <label for="password" class="form-label">{{ __('Password') }}</label>
                        <input type="password" id="password" class="form-control"
                               autocomplete="current-password"
                               wire:model="password"
                               wire:keydown.enter="logoutOtherBrowserSessions">
                        <x-input-error for="password" class="mt-2" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ __('Cancel') }}
                    </button>
                    <button type="button" class="btn btn-danger" wire:click="logoutOtherBrowserSessions" wire:loading.attr="disabled">
                        {{ __('Log Out Other Browser Sessions') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('livewire:load', function () {
            window.addEventListener('showLogoutModal', () => {
                var logoutModal = new bootstrap.Modal(document.getElementById('logoutOtherSessionsModal'));
                logoutModal.show();
            });
        });
    </script>
</div>