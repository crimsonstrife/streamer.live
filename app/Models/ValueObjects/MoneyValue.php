<?php

namespace App\Models\ValueObjects;

use App\Enums\Currency;
use Exception;
use InvalidArgumentException;

final class MoneyValue
{
    private float $amount;
    private string $currency; // currencies are limited to "USD" "EUR" "CAD" "GBP" "AUD" "NZD" "SEK" "NOK" "DKK" "PLN" "INR" "JPY" "MYR" "SGD"

    public function __construct(float $amount, string $currency = 'USD')
    {
        if ($amount < 0) {
            throw new InvalidArgumentException("Price cannot be negative.");
        }

        $this->amount = $amount;

        // Check currency is supported
        if (!in_array(strtoupper($currency), Currency::getValues())) {
            throw new InvalidArgumentException("Currency is not supported.");
        }

        $this->currency = strtoupper($currency);
    }

    public function raw(): float
    {
        return $this->amount;
    }

    public function formatted(): string
    {
        return number_format($this->amount, 2, '.', ',') . ' ' . $this->currency;
    }

    /**
     *
     * @throws Exception
     */
    public function symbolFormatted(): string
    {
        // Use the currency ENUM to match symbols
        $symbol = Currency::getCurrencySymbol($this->currency);

        $formatted = number_format($this->amount, 2, '.', ',');

        return $symbol .' '. $formatted;
    }

    public function equals(MoneyValue $other): bool
    {
        return $this->amount === $other->amount && $this->currency === $other->currency;
    }

    public function __toString(): string
    {
        return $this->formatted();
    }
}
