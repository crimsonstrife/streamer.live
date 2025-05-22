<?php

namespace App\Http\Requests;

use App\Models\Icon;
use Illuminate\Foundation\Http\FormRequest;

class StoreIconRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Let your policy handle “create” permission on Icon
        return $this->user()?->can('create', Icon::class);
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:'.implode(',', array_keys(config('blade-icons.sets'))),
            'style' => 'required|string',
            'icon' => 'nullable|file|mimes:svg',
            'svg_code' => 'nullable|string',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($v) {
            if (! $this->hasFile('icon') && empty($this->input('svg_code'))) {
                $v->errors()->add('icon', 'You must upload an SVG file or paste SVG code.');
            }
        });
    }
}
