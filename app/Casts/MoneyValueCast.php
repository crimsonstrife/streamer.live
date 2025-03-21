<?php

namespace App\Casts;

use App\Models\ValueObjects\MoneyValue;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use InvalidArgumentException;

class MoneyValueCast implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes): ?MoneyValue
    {
        if ($value === null) {
            return null;
        }

        return new MoneyValue((float) $value, $attributes['currency'] ?? 'USD');
    }

    public function set($model, string $key, $value, array $attributes)
    {
        if ($value instanceof MoneyValue) {
            return $value->raw();
        }

        if (is_numeric($value)) {
            return (float) $value;
        }

        throw new InvalidArgumentException("Invalid price format.");
    }
}
