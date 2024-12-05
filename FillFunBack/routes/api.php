<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // User-related routes
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::get('/profile/{id}', [UserController::class, 'profile']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Wishlist routes
    Route::post('/wishlist/toggle', [BoardController::class, 'toggleWishlist']);
    Route::get('/wishlist', [BoardController::class, 'getWishlist']);

    // History routes
    Route::post('/board/addToHistory', [BoardController::class, 'addToHistory']);
    Route::get('/board/getHistory', [BoardController::class, 'getHistory']);
});

// Public board routes
Route::get('/board', [BoardController::class, 'getBoards']);