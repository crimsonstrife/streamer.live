<?php

namespace App\Enums;

use Exception;
use Spatie\Enum\Laravel\Enum;

/**
 * Class Currency
 *
 * This class represents different currency symbols as constants.
 * It extends the Spatie\Enum\Laravel\Enum class to leverage enum functionality.
 * Currently supports : "USD" "EUR" "CAD" "GBP" "AUD" "NZD" "SEK" "NOK" "DKK" "PLN" "INR" "JPY" "MYR" "SGD"
 *
 * @package App\Enums
 */
final class Currency extends Enum
{
    /**
     * US Dollar currency.
     */
    public const USD = 'USD';

    public const EUR = 'EUR';

    public const CAD = 'CAD';

    public const GBP = 'GBP';

    public const AUD = 'AUD';

    public const NZD = 'NZD';

    public const SEK = 'SEK';

    public const NOK = 'NOK';

    public const DKK = 'DKK';

    public const PLN = 'PLN';

    public const INR = 'INR';

    public const JPY = 'JPY';

    public const MYR = 'MYR';

    public const SGD = 'SGD';

    /**
     * Get all possible values of the enum.
     *
     * @return array
     */
    public static function getValues(): array
    {
        return [
            self::USD,
            self::EUR,
            self::CAD,
            self::GBP,
            self::AUD,
            self::NZD,
            self::SEK,
            self::NOK,
            self::DKK,
            self::PLN,
            self::INR,
            self::JPY,
            self::MYR,
            self::SGD,
        ];
    }

    /**
     * Get the symbol for the current currency.
     * @param Currency|string $currencyEnum
     *
     * @return string
     * @throws Exception
     */
    public static function getCurrencySymbol(Currency|string $currencyEnum): string
    {
        if ($currencyEnum instanceof Currency) {
            return match ($currencyEnum->value) {
                self::USD, self::SGD, self::CAD, self::AUD, self::NZD => '$',
                self::EUR => '€',
                self::GBP => '£',
                self::SEK, self::DKK, self::NOK => 'kr',
                self::PLN => 'zł',
                self::INR => '₹',
                self::JPY => '¥',
                self::MYR => 'RM',
                default => throw new Exception('Unexpected match value'),
            };
        }
        return match ($currencyEnum) {
            self::USD, self::SGD, self::CAD, self::AUD, self::NZD => '$',
            self::EUR => '€',
            self::GBP => '£',
            self::SEK, self::DKK, self::NOK => 'kr',
            self::PLN => 'zł',
            self::INR => '₹',
            self::JPY => '¥',
            self::MYR => 'RM',
            default => throw new Exception('Unexpected match value'),
        };
    }
}
