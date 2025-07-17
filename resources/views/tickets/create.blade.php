<x-app-layout>
    <x-slot name="header">
        <h2 class="h4">Submit a Ticket</h2>
    </x-slot>

    <div class="container py-5">
        <form method="POST" action="{{ route('tickets.store') }}">
            @csrf

            <div class="mb-3">
                <label class="form-label">Type</label>
                <select name="type" class="form-select @error('type') is-invalid @enderror" required>
                    <option value="order_support" {{ old('type')==='order_support'?'selected':'' }}>
                        Order Support
                    </option>
                    <option value="unban_request" {{ old('type')==='unban_request'?'selected':'' }}>
                        Unban Request
                    </option>
                </select>
                @error('type')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label class="form-label">Order (if applicable)</label>
                <select name="order_id" class="form-select @error('order_id') is-invalid @enderror">
                    <option value="">— none —</option>
                    @foreach($orders as $o)
                        <option value="{{ $o->id }}" {{ old('order_id') === $o->id ? 'selected' : '' }}>
                            #{{ $o->friendly_id }}
                        </option>
                    @endforeach
                </select>
                @error('order_id')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label class="form-label">Subject</label>
                <input name="subject"
                       value="{{ old('subject') }}"
                       class="form-control @error('subject') is-invalid @enderror"
                       required>
                @error('subject')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-3">
                <label class="form-label">Message</label>
                <textarea name="message"
                          rows="5"
                          class="form-control @error('message') is-invalid @enderror"
                          required>{{ old('message') }}</textarea>
                @error('message')
                <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <button class="btn btn-primary">Submit Ticket</button>
        </form>
    </div>
</x-app-layout>
