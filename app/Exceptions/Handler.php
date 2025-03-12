<?php

namespace App\Exceptions;

use App\Enums\ErrorCodes;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Exception;

/**
 * Renders the custom exception and returns a response.
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \Throwable  $exception
 * @return \Illuminate\Http\Response
 */
class Handler extends ExceptionHandler
{
    /**
     * Renders the exception and returns a response.
     *
     * @param \Illuminate\Http\Request $request The request instance.
     * @param \Throwable $exception The exception instance.
     * @return \Illuminate\Http\Response The response instance.
     */
    public function render($request, Throwable $exception): \Illuminate\Http\Response
    {
        $customError = $this->handleCustomException($exception);

        return response()->view('errors.custom', [
            'code' => $customError['code'],
            'message' => $customError['message']
        ], $customError['status']);
    }

    /**
     * Handles the custom exception and returns the error code, message, and status.
     *
     * @param \Exception $exception The exception instance.
     * @return array The error code, message, and status.
     */
    protected function handleCustomException(Exception $exception): array
    {
        // Define your custom error codes and messages
        $errorMap = [
            (new ErrorCodes(ErrorCodes::SASQUATCH))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::SENTINEL))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::LIGHTHOUSE))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::GUARDIAN))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::ZEPHYR))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::OASIS))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::ALCHEMY))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::STAMPEDE))->getErrorArray(),
            // (new ErrorCodes(ErrorCodes::SNAIL))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::LYNX))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::VAULT))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::LOST))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::GATEKEEPER))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::HARMONY))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::WEASEL))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::RULER))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::SANCTUARY))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::SAGE))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::TELESCOPE))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::GHOST))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::PHOENIX))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::WRAITH))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::SPECTER))->getErrorArray(),
            (new ErrorCodes(ErrorCodes::TOWER))->getErrorArray(),
            // Add more custom mappings as needed
        ];

        $exceptionClass = get_class($exception);

        return $errorMap[$exceptionClass] ?? [
            'code' => (new ErrorCodes(ErrorCodes::MYSTIC))->getErrorCode(),
            'message' => (new ErrorCodes(ErrorCodes::MYSTIC))->getErrorMessage(),
            'status' => (new ErrorCodes(ErrorCodes::MYSTIC))->getHttpStatusCode(),
        ];
    }

    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected array $doNotReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected array $doNotFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {});
    }
}
