<?php

namespace App\Contracts;

readonly class SocialPostResult
{
    public function __construct(
        public ?string $externalId = null,
        public array   $raw = [],
    ) {
    }
}
