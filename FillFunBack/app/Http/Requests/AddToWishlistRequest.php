<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class AddToWishlistRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        // Authorize the user (you can add additional authorization logic here)
        // return Auth::check();
        return true;
    }

    public function rules()
    {
        return [
            'board_id' => 'required|exists:boards,id',
        ];
    }

    public function messages()
    {
        return [
            'board_id.required' => 'The board ID is required.',
            'board_id.exists' => 'The selected board does not exist.',
        ];
    }
}
