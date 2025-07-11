<?php

namespace Database\Seeders;

use App\Models\Font;
use Illuminate\Database\Seeder;

class FontSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fonts = [
            [
                'slug'       => 'inter',
                'name'       => 'Inter (variable)',
                'file_path'  => 'fonts/Inter-VariableFont.woff2',
                'is_builtin' => true,
            ],
            [
                'slug'       => 'inter-italic',
                'name'       => 'Inter Italic (variable)',
                'file_path'  => 'fonts/Inter-Italic-VariableFont.woff2',
                'is_builtin' => true,
            ],
            [
                'slug'       => 'noto-sans',
                'name'       => 'NotoSans (variable)',
                'file_path'  => 'fonts/NotoSans-VariableFont.woff2',
                'is_builtin' => true,
            ],
            [
                'slug'       => 'noto-sans-italic',
                'name'       => 'NotoSans Italic (variable)',
                'file_path'  => 'fonts/NotoSans-Italic-VariableFont.woff2',
                'is_builtin' => true,
            ],
            [
                'slug'       => 'open-sans',
                'name'       => 'OpenSans (variable)',
                'file_path'  => 'fonts/OpenSans-VariableFont.woff2',
                'is_builtin' => true,
            ],
            [
                'slug'       => 'open-sans-italic',
                'name'       => 'OpenSans Italic (variable)',
                'file_path'  => 'fonts/OpenSans-Italic-VariableFont.woff2',
                'is_builtin' => true,
            ],
            [
                'slug'       => 'oswald',
                'name'       => 'Oswald (variable)',
                'file_path'  => 'fonts/Oswald-VariableFont.woff2',
                'is_builtin' => true,
            ],
            [
                'slug'       => 'roboto',
                'name'       => 'Roboto (variable)',
                'file_path'  => 'fonts/Roboto-VariableFont.woff2',
                'is_builtin' => true,
            ],
            [
                'slug'       => 'roboto-italic',
                'name'       => 'Roboto Italic (variable)',
                'file_path'  => 'fonts/Roboto-Italic-VariableFont.woff2',
                'is_builtin' => true,
            ],
            [
                'slug'       => 'space-grotesk',
                'name'       => 'SpaceGrotesk (variable)',
                'file_path'  => 'fonts/SpaceGrotesk-VariableFont.woff2',
                'is_builtin' => true,
            ],
        ];

        foreach ($fonts as $font) {
            Font::updateOrCreate(
                ['slug' => $font['slug']],
                [
                    'name'       => $font['name'],
                    'file_path'  => $font['file_path'],
                    'is_builtin' => $font['is_builtin'],
                ]
            );
        }
    }
}
