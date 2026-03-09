<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
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
            'titre' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'statut' => ['required', 'in:A faire,En cours,Termine'],
            'priorite' => ['required', 'in:Basse,Moyenne,Haute'],
        ];
    }

    // public function messages(): array
    // {
    //     return [
    //         'titre.required' => 'La liste des utilisateurs est obligatoire.',
    //         'user_ids.array' => 'user_ids doit être un tableau.',
    //         'user_ids.*.exists' => 'Un des utilisateurs sélectionnés n\'existe pas.',
    //     ];
    // }
}
