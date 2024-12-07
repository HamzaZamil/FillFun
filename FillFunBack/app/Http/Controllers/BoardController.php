<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\User;
use App\Models\Wishlist;
use App\Models\GameHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\AddToGameHistoryRequest;

class BoardController extends Controller
{
    public function getBoards() {
        $boards = Board::all();
        return response()->json([
            'boards' => $boards
        ], 200);
    }
    public function toggleWishlist(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'board_id' => 'required|exists:boards,id',
        ]);

        $wishlist = Wishlist::where('user_id', $validated['user_id'])
            ->where('board_id', $validated['board_id'])
            ->first();

        if ($wishlist) {
            $wishlist->delete();
            return response()->json([
                'message' => 'Board removed from wishlist successfully',
                'isFavorite' => false
            ], 200);
        }

        Wishlist::create($validated);
        return response()->json([
            'message' => 'Board added to wishlist successfully',
            'isFavorite' => true
        ], 201);
    }

    public function getWishlist(Request $request){
        $validated = $request->validate([
            'user_id' =>'required|exists:users,id'
        ]);

        $boards = Wishlist::where('user_id', $validated['user_id'])
            ->with('board')
            ->get();

        return response()->json([
            'boards' => $boards
        ], 200);
    }

    public function isInWishlist(Request $request) {
        $validated = $request->validate([
            'user_id' =>'required|exists:users,id',
            'board_id' =>'required|exists:boards,id'
        ]);

        $isFavorite = Wishlist::where('user_id', $validated['user_id'])
            ->where('board_id', $validated['board_id'])
            ->exists();

        return response()->json([
            'isFavorite' => $isFavorite
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

    public function getHistory(Request $request) {
        $validated = $request->validate([
            'user_id' =>'required|exists:users,id'
        ]);

        $history = GameHistory::where('user_id', $validated['user_id'])
            ->with('board')
            ->get();

        return response()->json([
            'history' => $history
        ], 200);
    }
}