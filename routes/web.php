<?php

use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Support\Facades\Route;
use Laravel\Jetstream\Http\Controllers\TeamInvitationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// added the middleware but only to this group, the Filament routes are unaffected
Route::middleware([PreventRequestsDuringMaintenance::class])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', fn () => view('dashboard'))->name('dashboard');

Route::get('/team-invitations/{invitation}', [TeamInvitationController::class, 'accept'])
    ->middleware(['signed', 'verified', 'auth', AuthenticateSession::class])
    ->name('team-invitations.accept');
