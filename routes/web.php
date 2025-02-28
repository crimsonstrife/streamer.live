<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\StoreController;
use App\Http\Middleware\PreventRequestsDuringMaintenance;
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
    Route::get('/store', [StoreController::class, 'index'])->name('store.index');
    Route::get('/store/collection/{slug}', [StoreController::class, 'showCollection'])->name('store.collection');
    Route::get('/store/product/{slug}', [StoreController::class, 'showProduct'])->name('store.product');
    Route::prefix('store/cart')->name('store.cart.')->group(function () {
        Route::get('/', [CartController::class, 'showCart'])->name('show');
        Route::post('/add', [CartController::class, 'addToCart'])->name('add');
        Route::post('/update', [CartController::class, 'updateCart'])->name('update');
        Route::get('/remove/{variantId}', [CartController::class, 'removeFromCart'])->name('remove');
        Route::post('/checkout', [CartController::class, 'checkout'])->name('checkout');
    });
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', fn () => view('dashboard'))->name('dashboard');

Route::get('/team-invitations/{invitation}', [TeamInvitationController::class, 'accept'])
    ->middleware(['signed', 'verified', 'auth', AuthenticateSession::class])
    ->name('team-invitations.accept');
