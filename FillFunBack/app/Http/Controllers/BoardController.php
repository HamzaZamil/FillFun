<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wishlist;
use App\Models\GameHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\AddToGameHistoryRequest;

class BoardController extends Controller
{
    public function addToWishlist(Request $request)
{
    $validated = $request->validate([
        'user_id' => 'required|exists:users,id',
        'board_id' => 'required|exists:boards,id',
    ]);

    $user_id = $validated['user_id'];
    $board_id = $validated['board_id'];

    // Check if the board already exists in the user's wishlist
    $existingWishlist = Wishlist::where('user_id', $user_id)
                                ->where('board_id', $board_id)
                                ->first();
    if ($existingWishlist) {
        return response()->json([
            'message' => 'Board already in wishlist'
        ], 200);
    }

    // Add board to wishlist
    Wishlist::create($validated);

    return response()->json([
        'message' => 'Board added to wishlist successfully'
    ], 201);
}

public function removeFromWishlist(Request $request)
{
    $validated = $request->validate([
        'user_id' => 'required|exists:users,id',
        'board_id' => 'required|exists:boards,id',
    ]);

    $user_id = $validated['user_id'];
    $board_id = $validated['board_id'];

    // Find the wishlist entry
    $wishlist = Wishlist::where('user_id', $user_id)
                        ->where('board_id', $board_id)
                        ->first();
    if (!$wishlist) {
        return response()->json([
            'message' => 'Board not found in wishlist'
        ], 404);
    }

    // Delete the wishlist entry
    $wishlist->delete();

    return response()->json([
        'message' => 'Board removed from wishlist successfully'
    ], 200);
}




public function addToHistory(AddToGameHistoryRequest $request)
    {
        // Add game history
        $history = GameHistory::create($request->validated());

        return response()->json([
            'message' => 'Game history added successfully',
            'history' => $history
        ], 201);
    }



    
}
