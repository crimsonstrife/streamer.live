<?php

namespace Database\Seeders;

use App\Models\SpamFilterPattern;
use Illuminate\Database\Seeder;

class SpamFilterPatternsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blacklists = config('word-blacklists');

        foreach ($blacklists as $listName => $groups) {
            foreach ($groups as $language => $patterns) {
                foreach ($patterns as $pattern) {
                    // Skip empty or comment‐like entries
                    $pattern = trim($pattern);
                    if ($pattern === '' || str_starts_with($pattern, '#') || str_starts_with($pattern, '//')) {
                        continue;
                    }

                    // Insert or update
                    SpamFilterPattern::updateOrCreate(
                        [
                            'list' => $listName,
                            'pattern' => $pattern,
                        ],
                        [] // no other fields for now
                    );
                }
            }
        }
    }
}
