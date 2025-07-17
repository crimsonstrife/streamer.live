<x-app-layout>
    <div class="d-flex justify-content-between align-items-center">
        <h2 class="h4">Ticket #{{ $ticket->id }} &mdash; {{ $ticket->subject }}</h2>
        <small class="text-muted">
            Status:
            <span
                class="badge bg-{{ $ticket->status==='open'?'success':($ticket->status==='pending'?'warning':'secondary') }}">
                    {{ ucfirst($ticket->status) }}
                </span>
        </small>
    </div>
    <div class="container py-5">
        <div class="border rounded p-3 mb-3">
            <div class="d-flex justify-content-between">
                <strong>{{ $ticket->user->username }}</strong>
                <small class="text-muted">{{ $ticket->created_at->diffForHumans() }}</small>
            </div>
            <p class="mb-0">{!! nl2br($ticket->message) !!}</p>
        </div>
    </div>

    <div class="container py-5">
        {{-- Public Conversation --}}
        <h5>Conversation</h5>
        @foreach($ticket->publicMessages as $msg)
            <div class="border rounded p-3 mb-3">
                <div class="d-flex justify-content-between">
                    <strong>{{ $msg->commentedBy->name }}</strong>
                    <small class="text-muted">{{ $msg->created_at->diffForHumans() }}</small>
                </div>
                <p class="mb-0">{!! nl2br($msg->content) !!}</p>
            </div>
        @endforeach

        {{-- Reply Form --}}
        @can('reply', $ticket)
            <form method="POST" action="{{ route('tickets.reply', $ticket) }}" class="mb-5">
                @csrf
                <div class="mb-3">
                    <label>Your Reply</label>
                    <textarea name="body" rows="3"
                              class="form-control @error('body') is-invalid @enderror"
                              required>{{ old('body') }}</textarea>
                    @error('body')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <button class="btn btn-primary">Send Reply</button>
            </form>
        @endcan

        {{-- Internal Notes (staff only) --}}
        @can('note', $ticket)
            <h5>Internal Notes</h5>
            @foreach($ticket->privateNotes as $note)
                <div class="border rounded bg-light p-3 mb-3">
                    <div class="d-flex justify-content-between">
                        <strong>{{ $note->commentedBy->name }}</strong>
                        <small class="text-muted">{{ $note->created_at->diffForHumans() }}</small>
                    </div>
                    <p class="mb-0">{!! nl2br($note->content) !!}</p>
                </div>
            @endforeach

            <form method="POST" action="{{ route('tickets.note', $ticket) }}">
                @csrf
                <div class="mb-3">
                    <label>Internal Note</label>
                    <textarea name="body" rows="2"
                              class="form-control @error('body') is-invalid @enderror"
                              required>{{ old('body') }}</textarea>
                    @error('body')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <button class="btn btn-secondary">Add Note</button>
            </form>
        @endcan
    </div>
</x-app-layout>
