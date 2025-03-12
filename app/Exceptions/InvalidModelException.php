<?php

namespace App\Exceptions;

use Exception;

final class InvalidModelException extends Exception
{
    public static function make(string $message): static
    {
        return new self(message: $message);
    }
}
