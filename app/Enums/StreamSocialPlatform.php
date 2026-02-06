<?php

namespace App\Enums;

use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum StreamSocialPlatform: string implements HasLabel, HasIcon
{
    case X = 'x';
    case Bluesky = 'bluesky';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::X => 'X (Twitter)',
            self::Bluesky => 'Bluesky',
        };
    }

    public function getIcon(): ?string
    {
        return match ($this) {
            self::X => 'fab-x-twitter',
            self::Bluesky => 'fab-bluesky',
        };
    }

    public static function values(): array
    {
        return array_map(static fn (self $case) => $case->value, self::cases());
    }
}

