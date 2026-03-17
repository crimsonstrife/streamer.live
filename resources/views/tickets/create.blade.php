<x-app-layout>
    <x-slot name="header">
        <h2 class="h4">Submit a Ticket</h2>
    </x-slot>

    @php
        $ticketTypes = \App\Models\Ticket::types();
        $selectedType = old('type', $defaultType ?? array_key_first($ticketTypes));
        $selectedOrderId = old('order_id', $defaultOrderId ?? '');
    @endphp

    <div class="container py-5">
        <form method="POST" action="{{ route('tickets.store') }}" id="ticket-create-form">
            @csrf

            <div class="mb-3">
                <label for="ticket-type" class="form-label">Type</label>
                <select
                    id="ticket-type"
                    name="type"
                    class="form-select @error('type') is-invalid @enderror"
                    required
                >
                    @foreach($ticketTypes as $value => $label)
                        <option value="{{ $value }}" {{ $selectedType === $value ? 'selected' : '' }}>
                            {{ $label }}
                        </option>
                    @endforeach
                </select>
                @error('type')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div
                class="mb-3"
                id="order-support-group"
                @if($selectedType !== 'order_support') style="display: none;" @endif
            >
                <label for="order-id" class="form-label">Order</label>
                <select
                    id="order-id"
                    name="order_id"
                    class="form-select @error('order_id') is-invalid @enderror"
                    @if($selectedType !== 'order_support') disabled @endif
                >
                    <option value="">— select an order —</option>
                    @foreach($orders as $o)
                        <option value="{{ $o->id }}" {{ (string) $selectedOrderId === (string) $o->id ? 'selected' : '' }}>
                            #{{ $o->friendly_id }}
                        </option>
                    @endforeach
                </select>
                <div class="form-text">
                    Required for order support tickets.
                </div>
                @error('order_id')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label for="ticket-subject" class="form-label">Subject</label>
                <input
                    id="ticket-subject"
                    name="subject"
                    value="{{ old('subject') }}"
                    class="form-control @error('subject') is-invalid @enderror"
                    required
                >
                @error('subject')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label for="ticket-message" class="form-label">Message</label>
                <textarea
                    id="ticket-message"
                    name="message"
                    rows="5"
                    class="form-control @error('message') is-invalid @enderror"
                    required
                >{{ old('message') }}</textarea>
                @error('message')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <button class="btn btn-primary">Submit Ticket</button>
        </form>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const typeSelect = document.getElementById('ticket-type');
            const orderGroup = document.getElementById('order-support-group');
            const orderSelect = document.getElementById('order-id');

            function syncOrderField() {
                const isOrderSupport = typeSelect.value === 'order_support';

                orderGroup.style.display = isOrderSupport ? '' : 'none';
                orderSelect.disabled = !isOrderSupport;
                orderSelect.required = isOrderSupport;

                if (!isOrderSupport) {
                    orderSelect.value = '';
                }
            }

            typeSelect.addEventListener('change', syncOrderField);
            syncOrderField();
        });
    </script>
</x-app-layout>
