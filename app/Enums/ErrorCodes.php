<?php

namespace App\Enums;

use Exception;
use Spatie\Enum\Laravel\Enum;
use App\Enums\HttpStatusCode;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
//use Symfony\Component\HttpKernel\Exception\RequestTimeoutHttpException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Database\QueryException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\GoneHttpException;
use Symfony\Component\HttpKernel\Exception\LengthRequiredHttpException;
use Symfony\Component\HttpKernel\Exception\PreconditionFailedHttpException;
use Symfony\Component\HttpKernel\Exception\PreconditionRequiredHttpException;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Exceptions\RoleAlreadyExists;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;
use Spatie\Permission\Exceptions\PermissionAlreadyExists;
use Spatie\Permission\Exceptions\GuardDoesNotMatch;
use Laravel\Passport\Exceptions\MissingScopeException;
use Laravel\Passport\Exceptions\OAuthServerException;

/**
 * Enum ErrorCodes
 *
 * This enum maps various exceptions to custom error codes and provides methods to retrieve
 * the corresponding HTTP status code, error code, error message, and developer-only message.
 *
 * @package App\Enums
 */
final class ErrorCodes extends Enum
{
    const SASQUATCH = ModelNotFoundException::class;
    const SENTINEL = AuthenticationException::class;
    const LIGHTHOUSE = HttpException::class;
    const GUARDIAN = AuthorizationException::class;
    const ZEPHYR = ValidationException::class;
    const OASIS = ServiceUnavailableHttpException::class;
    const ALCHEMY = HttpResponseException::class;
    const STAMPEDE = TooManyRequestsHttpException::class;
    //const SNAIL = RequestTimeoutHttpException::class;
    const LYNX = TokenMismatchException::class;
    const VAULT = QueryException::class;
    const LOST = NotFoundHttpException::class;
    const GATEKEEPER = MethodNotAllowedHttpException::class;
    const HARMONY = ConflictHttpException::class;
    const WEASEL = GoneHttpException::class;
    const RULER = LengthRequiredHttpException::class;
    const SANCTUARY = PreconditionFailedHttpException::class;
    const SAGE = PreconditionRequiredHttpException::class;
    const TELESCOPE = UnauthorizedException::class;
    const GHOST = RoleDoesNotExist::class;
    const PHOENIX = RoleAlreadyExists::class;
    const WRAITH = PermissionDoesNotExist::class;
    const SPECTER = PermissionAlreadyExists::class;
    const TOWER = GuardDoesNotMatch::class;
    const SIREN = MissingScopeException::class;
    const PELICAN = OAuthServerException::class;
    const MYSTIC = Exception::class;

    /**
     * Get the error details as an array.
     * Contains the status code, error code, error message, and developer-only message.
     * @return array
     */
    public function getErrorArray(): array
    {
        return [
            'status_code' => $this->getStatusCode(),
            'error_code' => $this->getErrorCode(),
            'error_message' => $this->getErrorMessage(),
            'developer_only_message' => $this->getDeveloperOnlyMessage(),
        ];
    }

    /**
     * Get the HTTP status code associated with the error code.
     *
     * @return HttpStatusCode|string|int
     */
    public function getStatusCode(): HttpStatusCode|string|int
    {
        return match ($this) {
            self::SASQUATCH, self::LOST, self::GHOST, self::WRAITH => HttpStatusCode::NOTFOUND,
            self::SENTINEL, self::LYNX, self::TELESCOPE => HttpStatusCode::UNAUTHORIZED,
            self::LIGHTHOUSE, self::ALCHEMY, self::VAULT, self::PELICAN, self::MYSTIC => HttpStatusCode::INTERNALSERVERERROR,
            self::GUARDIAN, self::SIREN => HttpStatusCode::FORBIDDEN,
            self::ZEPHYR => HttpStatusCode::UNPROCESSABLEENTITY,
            self::OASIS => HttpStatusCode::SERVICEUNAVAILABLE,
            self::STAMPEDE => HttpStatusCode::TOOMANYREQUESTS,
            //self::SNAIL => HttpStatusCode::REQUESTTIMEOUT,
            self::GATEKEEPER => HttpStatusCode::METHODNOTALLOWED,
            self::HARMONY, self::PHOENIX, self::SPECTER => HttpStatusCode::CONFLICT,
            self::WEASEL => HttpStatusCode::GONE,
            self::RULER => HttpStatusCode::LENGTHREQUIRED,
            self::SANCTUARY => HttpStatusCode::PRECONDITIONFAILED,
            self::SAGE => HttpStatusCode::PRECONDITIONREQUIRED,
            self::TOWER => HttpStatusCode::BADREQUEST,
        };
    }

    /**
     * Get the error code as a string.
     *
     * @return string
     */
    public function getErrorCode(): string
    {
        return match ($this) {
            self::SASQUATCH => 'SASQUATCH',
            self::SENTINEL => 'SENTINEL',
            self::LIGHTHOUSE => 'LIGHTHOUSE',
            self::GUARDIAN => 'GUARDIAN',
            self::ZEPHYR => 'ZEPHYR',
            self::OASIS => 'OASIS',
            self::ALCHEMY => 'ALCHEMY',
            self::STAMPEDE => 'STAMPEDE',
            //self::SNAIL => 'SNAIL',
            self::LYNX => 'LYNX',
            self::VAULT => 'VAULT',
            self::LOST => 'LOST',
            self::GATEKEEPER => 'GATEKEEPER',
            self::HARMONY => 'HARMONY',
            self::WEASEL => 'WEASEL',
            self::RULER => 'RULER',
            self::SANCTUARY => 'SANCTUARY',
            self::SAGE => 'SAGE',
            self::TELESCOPE => 'TELESCOPE',
            self::GHOST => 'GHOST',
            self::PHOENIX => 'PHOENIX',
            self::WRAITH => 'WRAITH',
            self::SPECTER => 'SPECTER',
            self::TOWER => 'TOWER',
            self::SIREN => 'SIREN',
            self::PELICAN => 'PELICAN',
            self::MYSTIC => 'MYSTIC',
        };
    }

    /**
     * Get the user-friendly error message.
     *
     * @return string
     */
    public function getErrorMessage(): string
    {
        return match ($this) {
            self::SASQUATCH => 'The requested model was not found, contact the Administrator.',
            self::SENTINEL => 'Authentication or Permission error, contact the Administrator.',
            self::LIGHTHOUSE => 'Server error',
            self::GUARDIAN => 'Forbidden',
            self::ZEPHYR => 'Unprocessable entity',
            self::OASIS => 'Service unavailable',
            self::ALCHEMY => 'HTTP response exception',
            self::STAMPEDE => 'Too many requests',
            //self::SNAIL => 'Request timeout',
            self::LYNX => 'Token mismatch',
            self::VAULT => 'Query exception',
            self::LOST => 'Not found',
            self::GATEKEEPER => 'Method not allowed',
            self::HARMONY => 'Conflict',
            self::WEASEL => 'Gone',
            self::RULER => 'Length required',
            self::SANCTUARY => 'Precondition failed',
            self::SAGE => 'Precondition required',
            self::TELESCOPE => 'Unauthorized',
            self::GHOST => 'Role does not exist',
            self::PHOENIX => 'Role already exists',
            self::WRAITH => 'Permission does not exist',
            self::SPECTER => 'Permission already exists',
            self::TOWER => 'Guard does not match',
            self::SIREN => 'Missing scope',
            self::PELICAN => 'OAuth server exception',
            self::MYSTIC => 'Exception',
        };
    }

    /**
     * Get the developer-only error messages.
     * These messages are intended for developers to debug the application.
     *
     * @return string
     */
    public function getDeveloperOnlyMessage(): string
    {
        return match ($this) {
            self::SASQUATCH => 'The requested model was not found.',
            self::SENTINEL => 'Authentication or Permission error.',
            self::LIGHTHOUSE => 'Server error',
            self::GUARDIAN => 'Forbidden',
            self::ZEPHYR => 'Unprocessable entity',
            self::OASIS => 'Service unavailable',
            self::ALCHEMY => 'HTTP response exception',
            self::STAMPEDE => 'Too many requests',
            //self::SNAIL => 'Request timeout',
            self::LYNX => 'Token mismatch',
            self::VAULT => 'Query exception',
            self::LOST => 'Not found',
            self::GATEKEEPER => 'Method not allowed',
            self::HARMONY => 'Conflict',
            self::WEASEL => 'Gone',
            self::RULER => 'Length required',
            self::SANCTUARY => 'Precondition failed',
            self::SAGE => 'Precondition required',
            self::TELESCOPE => 'Unauthorized',
            self::GHOST => 'Role does not exist',
            self::PHOENIX => 'Role already exists',
            self::WRAITH => 'Permission does not exist',
            self::SPECTER => 'Permission already exists',
            self::TOWER => 'Guard does not match',
            self::SIREN => 'Missing scope',
            self::PELICAN => 'OAuth server exception',
            self::MYSTIC => 'Exception',
        };
    }
}
