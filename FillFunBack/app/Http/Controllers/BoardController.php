<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    public function addToWishlist($board_id)
    {
        $user = Auth::user();
        $user = User::findOrFail(3);

        // Check if the board already exists in the user's wishlist
        $existingWishlist = Wishlist::where('user_id', $user->id)
                                    ->where('board_id', $board_id)
                                    ->first();
        if ($existingWishlist) {
            return response()->json([
                'message' => 'Board already in wishlist'
            ], 200);
        }

        // Add board to wishlist
        $wishlist = new Wishlist();
        $wishlist->user_id = $user->id;
        $wishlist->board_id = $board_id;
        $wishlist->save();

        return response()->json([
            'message' => 'Board added to wishlist successfully'
        ], 201);
    }


    public function removeFromWishlist(Request $request, $board_id)
    {
        $user = User::findOrFail(1); // Fetch user with ID 1 for testing

        // Find the wishlist entry
        $wishlist = Wishlist::where('user_id', $user->id)
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

    
}
