<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignUsersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_ids' => ['required', 'array', 'min:1'],
            'user_ids.*' => ['integer', 'exists:users,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_ids.required' => 'La liste des utilisateurs est obligatoire.',
            'user_ids.array' => 'user_ids doit être un tableau.',
            'user_ids.*.exists' => 'Un des utilisateurs sélectionnés n\'existe pas.',
        ];
    }
}
