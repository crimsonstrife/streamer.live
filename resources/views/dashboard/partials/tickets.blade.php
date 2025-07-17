@php
    use App\Models\Ticket;$openTickets = Ticket::where('user_id', Auth::id())
            ->whereIn('status', ['open','pending'])
            ->orderByDesc('created_at')
            ->get();
@endphp
<div class="card shadow-lg rounded mb-4">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">My Open Tickets</h5>
            <span class="badge bg-{{ $openTickets->count() ? 'warning' : 'secondary' }}">
        {{ $openTickets->count() }}
      </span>
        </div>

        @if($openTickets->isNotEmpty())
            <ul class="list-unstyled mb-3">
                @foreach($openTickets->take(3) as $ticket)
                    <li class="d-flex justify-content-between align-items-center py-1">
                        <a href="{{ route('tickets.show', $ticket) }}" class="text-decoration-none">
                            #{{ $ticket->id }}: {{ \Illuminate\Support\Str::limit($ticket->subject, 30) }}
                        </a>
                        <span class="badge bg-{{ $ticket->status === 'open' ? 'success' : 'warning' }}">
              {{ ucfirst($ticket->status) }}
            </span>
                    </li>
                @endforeach
            </ul>

            @if($openTickets->count() > 3)
                <a href="{{ route('tickets.index') }}" class="btn btn-sm btn-outline-primary mb-2">
                    View All Tickets
                </a>
            @endif
        @else
            <p class="text-muted small mb-3">No open tickets at the moment.</p>
        @endif

        <a href="{{ route('tickets.create') }}" class="btn btn-primary">
            Open New Ticket
        </a>
    </div>
</div>
