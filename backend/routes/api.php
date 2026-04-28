<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;

// Public routes
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);
Route::post('/contact',       [ContactController::class, 'store']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout',           [AuthController::class, 'logout']);
    Route::get('/auth/me',                [AuthController::class, 'me']);
    Route::get('/bookings',               [BookingController::class, 'index']);
    Route::post('/bookings',              [BookingController::class, 'store']);
    Route::get('/bookings/{id}',          [BookingController::class, 'show']);
    Route::patch('/bookings/{id}/cancel', [BookingController::class, 'cancel']);
});

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/bookings',                      [BookingController::class, 'adminIndex']);
    Route::patch('/bookings/{id}/status',        [BookingController::class, 'updateStatus']);
    Route::post('/rooms',                        [RoomController::class, 'store']);
    Route::put('/rooms/{id}',                    [RoomController::class, 'update']);
    Route::delete('/rooms/{id}',                 [RoomController::class, 'destroy']);
    Route::patch('/rooms/{id}/availability',     [RoomController::class, 'toggleAvailability']);
});
