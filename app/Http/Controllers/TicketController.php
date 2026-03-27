<?php

namespace App\Http\Controllers;

use App\Models\StoreObjects\Order;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::where('user_id', Auth::id())
            ->orderByDesc('updated_at')
            ->paginate(10);

        return view('tickets.index', compact('tickets'));
    }

    public function create(Request $request)
    {
        $orders = Order::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get(['id', 'friendly_id']);

        $allowedTypes = array_keys(Ticket::types());

        $defaultType = $request->string('type')->toString();
        if (! in_array($defaultType, $allowedTypes, true)) {
            $defaultType = 'order_support';
        }

        $defaultOrderId = $request->integer('order_id') ?: null;

        return view('tickets.create', compact('orders', 'defaultType', 'defaultOrderId'));
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'type' => ['required', Rule::in(array_keys(Ticket::types()))],
            'order_id' => [
                Rule::requiredIf(fn () => $request->input('type') === 'order_support'),
                'nullable',
                Rule::exists('orders', 'id')->where(
                    fn ($query) => $query->where('user_id', Auth::id())
                ),
            ],
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ], [
            'order_id.required' => 'Please select the order this ticket is about.',
        ]);

        $ticket = Ticket::create([
            'user_id' => Auth::id(),
            'assigned_to' => null,
            'type' => $data['type'],
            'order_id' => $data['type'] === 'order_support' ? ($data['order_id'] ?? null) : null,
            'subject' => $data['subject'],
            'message' => $data['message'],
            'status' => 'open',
        ]);

        return redirect()
            ->route('tickets.show', $ticket)
            ->with('success', 'Your ticket has been submitted.');
    }

    public function show(Ticket $ticket)
    {
        $this->authorize('view', $ticket);

        $ticket->load([
            'user',
            'assignedTo',
            'publicMessages.commentedBy',
            'privateNotes.commentedBy',
            'order',
        ]);

        return view('tickets.show', compact('ticket'));
    }

    public function reply(Request $request, Ticket $ticket): RedirectResponse
    {
        $this->authorize('reply', $ticket);

        $data = $request->validate([
            'body' => 'required|string',
        ]);

        $ticket->messages()->create([
            'commented_by_id' => Auth::id(),
            'commented_by_type' => get_class(Auth::user()),
            'content' => $data['body'],
            'is_public' => true,
        ]);

        $ticket->update(['status' => 'pending']);

        return back()->with('success', 'Your reply has been posted.');
    }

    public function note(Request $request, Ticket $ticket): RedirectResponse
    {
        $this->authorize('note', $ticket);

        $data = $request->validate([
            'body' => 'required|string',
        ]);

        $ticket->messages()->create([
            'commented_by_id' => Auth::id(),
            'commented_by_type' => get_class(Auth::user()),
            'content' => $data['body'],
            'is_public' => false,
        ]);

        return back()->with('success', 'Internal note added.');
    }
}
