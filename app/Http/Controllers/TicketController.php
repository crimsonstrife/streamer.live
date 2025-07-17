<?php

namespace App\Http\Controllers;

use App\Models\StoreObjects\Order;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    /**
     * Display a paginated list of the current user's tickets.
     */
    public function index()
    {
        $tickets = Ticket::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->paginate(10);

        return view('tickets.index', compact('tickets'));
    }

    /**
     * Validate and store a new ticket, plus its initial public message.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'type' => 'required|in:order_support,unban_request',
            'order_id' => 'nullable|exists:orders,id',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Create the ticket record
        $ticket = Ticket::create([
            'user_id' => Auth::id(),
            'assigned_to' => null,
            'type' => $data['type'],
            'order_id' => $data['order_id'] ?? null,
            'subject' => $data['subject'],
            'message' => $data['message'],
            'status' => 'open',
        ]);

        return redirect()
            ->route('tickets.index')
            ->with('success', 'Your ticket has been submitted.');
    }

    /**
     * Show the form to create a new ticket.
     */
    public function create()
    {
        // For order‐support tickets, let them pick from their past orders
        $orders = Order::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get(['id', 'friendly_id']);

        return view('tickets.create', compact('orders'));
    }

    /**
     * Display a single ticket, with its public replies and private notes.
     */
    public function show(Ticket $ticket)
    {
        $this->authorize('view', $ticket);

        $ticket->load([
            'user',
            'assignedTo',
            'publicMessages.commentedBy',
            'privateNotes.commentedBy',
            'order',  // if you want to show linked order
        ]);

        return view('tickets.show', compact('ticket'));
    }

    /**
     * Handle a public reply by the ticket owner.
     */
    public function reply(Request $request, Ticket $ticket): RedirectResponse
    {
        $this->authorize('reply', $ticket);

        $data = $request->validate([
            'body' => 'required|string',
        ]);

        $ticket->messages()->create([
            'commented_by_id' => Auth::id(),
            'commented_by_type' => get_class(Auth::user()),
            'body' => $data['body'],
            'is_public' => true,
        ]);

        // Optionally move status to “pending” so staff know it needs attention
        $ticket->update(['status' => 'pending']);

        return back()->with('success', 'Your reply has been posted.');
    }

    /**
     * Add an internal note (private) by staff/moderators.
     */
    public function note(Request $request, Ticket $ticket)
    {
        $this->authorize('note', $ticket);

        $data = $request->validate([
            'body' => 'required|string',
        ]);

        $ticket->messages()->create([
            'commented_by_id' => Auth::id(),
            'commented_by_type' => get_class(Auth::user()),
            'body' => $data['body'],
            'is_public' => false,
        ]);

        return back()->with('success', 'Internal note added.');
    }
}
