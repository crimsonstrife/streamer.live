<?php

namespace App\Policies;

use App\Models\AuthObjects\User;
use App\Models\Ticket;
use Illuminate\Auth\Access\HandlesAuthorization;

class TicketPolicy
{
    use HandlesAuthorization;

    /**
     * Grant *all* abilities to staff (users with the "manage tickets" permission).
     * This runs before any other checks.
     */
    public function before(User $user, $ability)
    {
        if ($user->can('manage-tickets')) {
            return true;
        }
    }

    /**
     * Determine if the user can view this ticket.
     * Owners (and, via before(), staff) can view.
     */
    public function view(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    /**
     * Determine if the user can post a public reply on this ticket.
     * Only the ticket owner (and staff via before()) can reply.
     */
    public function reply(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    /**
     * Determine if the user can add an internal (private) note.
     * Only staff (via before()) can note; everyone else is denied.
     */
    public function note(User $user, Ticket $ticket): bool
    {
        return false;
    }
}
