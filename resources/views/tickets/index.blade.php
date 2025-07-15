<x-app-layout>
    <x-slot name="header">
        <h2 class="h4">Support Tickets</h2>
    </x-slot>

    <div class="container py-5">
        <a href="{{ route('tickets.create') }}" class="btn btn-primary mb-4">New Ticket</a>

        @if($tickets->count())
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @foreach($tickets as $t)
                    <tr>
                        <td>{{ $t->id }}</td>
                        <td>{{ $t->subject }}</td>
                        <td>{{ ucwords(str_replace('_',' ',$t->type)) }}</td>
                        <td>
                                <span
                                    class="badge bg-{{ $t->status==='open'?'success':($t->status==='pending'?'warning':'secondary') }}">
                                    {{ ucfirst($t->status) }}
                                </span>
                        </td>
                        <td>{{ $t->created_at->format('M j, Y') }}</td>
                        <td>
                            <a href="{{ route('tickets.show', $t) }}" class="btn btn-sm btn-outline-primary">
                                View
                            </a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>

            <div class="d-flex justify-content-center">
                {{ $tickets->links('vendor.pagination.bootstrap-5') }}
            </div>
        @else
            <p class="text-muted">You have no support tickets.</p>
        @endif
    </div>
</x-app-layout>
