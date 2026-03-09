<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'nom' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'couleur' => ['nullable', 'string', 'max:20'],
        ];
    }
    public function messages(): array
    {
        return [
            'nom.string' => 'Le nom doit être une chaîne valide.',
            'nom.max' => 'Le nom ne peut pas dépasser 255 caractères.',
            'description.string' => 'La description doit être une chaîne valide.',
            'couleur.string' => 'La couleur doit être une chaîne valide.',
        ];
    }
}
