<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddToGameHistoryRequest extends FormRequest
{
    public function authorize()
    {
        // Authorize the user (you can add additional authorization logic here)
        return true; // Adjust as needed, e.g., Auth::check();
    }

    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'board_id' => 'required|exists:boards,id',
            'score' => 'required|integer',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'The user ID is required.',
            'user_id.exists' => 'The selected user does not exist.',
            'board_id.required' => 'The board ID is required.',
            'board_id.exists' => 'The selected board does not exist.',
            'score.required' => 'The score is required.',
            'score.integer' => 'The score must be an integer.',
        ];
    }
}
