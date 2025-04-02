<?php

namespace App\Listeners;

use App\Models\Order;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener]
class AttachUserToOrders
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        $user = $event->user;

        Order::where('email', $user->email)
            ->whereNull('user_id')
            ->update(['user_id' => $user->id]);
    }
}
