<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    public function usersWhoWishlisted()
    {
        return $this->belongsToMany(User::class, 'wishlists');
    }

    public function userGameHistory(){
        return $this->belongsToMany(User::class, 'History');
    }

}