<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * Enum HttpStatusCode
 *
 * This enum represents the various HTTP status codes.
 *
 * @package App\Enums
 */
final class HttpStatusCode extends Enum
{
    /**
     * Indicates that the request has succeeded.
     */
    public const OK = 200;

    /**
     * Indicates that the request has been fulfilled and resulted in a new resource being created.
     */
    public const CREATED = 201;

    /**
     * Indicates that the request has been accepted for processing, but the processing has not been completed.
     */
    public const ACCEPTED = 202;

    /**
     * Indicates that the request has been successfully processed, but is returning information that may be from another source.
     */
    public const NONAUTHORITATIVEINFORMATION = 203;

    /**
     * Indicates that the server successfully processed the request, but is not returning any content.
     */
    public const NOCONTENT = 204;

    /**
     * Indicates that the server successfully processed the request, but is not returning any content and requires that the requester reset the document view.
     */
    public const RESETCONTENT = 205;

    /**
     * Indicates that the server is delivering only part of the resource due to a range header sent by the client.
     */
    public const PARTIALCONTENT = 206;

    /**
     * Indicates that the message body that follows is an XML message and can contain multiple separate responses.
     */
    public const MULTISTATUS = 207;

    /**
     * Indicates that the members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.
     */
    public const ALREADYREPORTED = 208;

    /**
     * Indicates that the server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
     */
    public const IMUSED = 226;

    /**
     * Indicates multiple options for the resource from which the client may choose.
     */
    public const MULTIPLECHOICES = 300;

    /**
     * Indicates that the resource requested has been assigned a new permanent URI.
     */
    public const MOVEDPERMANENTLY = 301;

    /**
     * Indicates that the resource requested has been temporarily moved to a different URI.
     */
    public const FOUND = 302;

    /**
     * Indicates that the response to the request can be found under another URI using a GET method.
     */
    public const SEEOTHER = 303;

    /**
     * Indicates that the resource has not been modified since the version specified by the request headers.
     */
    public const NOTMODIFIED = 304;

    /**
     * Indicates that the requested resource is only available through a proxy, the address for which is provided in the response.
     */
    public const USEPROXY = 305;

    /**
     * No longer used. Originally meant "Subsequent requests should use the specified proxy."
     */
    public const UNUSED = 306;

    /**
     * Indicates that the request should be repeated with another URI, but future requests can still use the original URI.
     */
    public const TEMPORARYREDIRECT = 307;

    /**
     * Indicates that the request and all future requests should be repeated using another URI.
     */
    public const PERMANENTREDIRECT = 308;

    /**
     * Indicates that the server cannot or will not process the request due to an apparent client error.
     */
    public const BADREQUEST = 400;

    /**
     * Indicates that the request requires user authentication.
     */
    public const UNAUTHORIZED = 401;

    /**
     * Reserved for future use.
     */
    public const PAYMENTREQUIRED = 402;

    /**
     * Indicates that the server understood the request, but refuses to authorize it.
     */
    public const FORBIDDEN = 403;

    /**
     * Indicates that the requested resource could not be found.
     */
    public const NOTFOUND = 404;

    /**
     * Indicates that the request method is not supported for the requested resource.
     */
    public const METHODNOTALLOWED = 405;

    /**
     * Indicates that the requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
     */
    public const NOTACCEPTABLE = 406;

    /**
     * Indicates that the client must first authenticate itself with the proxy.
     */
    public const PROXYAUTHENTICATIONREQUIRED = 407;

    /**
     * Indicates that the server timed out waiting for the request.
     */
    public const REQUESTTIMEOUT = 408;

    /**
     * Indicates that the request could not be processed because of conflict in the request.
     */
    public const CONFLICT = 409;

    /**
     * Indicates that the resource requested is no longer available and will not be available again.
     */
    public const GONE = 410;

    /**
     * Indicates that the request did not specify the length of its content, which is required by the requested resource.
     */
    public const LENGTHREQUIRED = 411;

    /**
     * Indicates that the server does not meet one of the preconditions that the requester put on the request.
     */
    public const PRECONDITIONFAILED = 412;

    /**
     * Indicates that the request is larger than the server is willing or able to process.
     */
    public const PAYLOADTOOLARGE = 413;

    /**
     * Indicates that the URI provided was too long for the server to process.
     */
    public const URITOOLONG = 414;

    /**
     * Indicates that the request entity has a media type which the server or resource does not support.
     */
    public const UNSUPPORTEDMEDIATYPE = 415;

    /**
     * Indicates that the client has asked for a portion of the file, but the server cannot supply that portion.
     */
    public const RANGENOTSATISFIABLE = 416;

    /**
     * Indicates that the server cannot meet the requirements of the Expect request-header field.
     */
    public const EXPECTATIONFAILED = 417;

    /**
     * Indicates that the server refuses to brew coffee because it is, permanently, a teapot.
     */
    public const IMATEAPOT = 418;

    /**
     * Indicates that the request was directed at a server that is not able to produce a response.
     */
    public const MISDIRECTEDREQUEST = 421;

    /**
     * Indicates that the request was well-formed but was unable to be followed due to semantic errors.
     */
    public const UNPROCESSABLEENTITY = 422;

    /**
     * Indicates that the resource that is being accessed is locked.
     */
    public const LOCKED = 423;

    /**
     * Indicates that the request failed due to failure of a previous request.
     */
    public const FAILEDDEPENDENCY = 424;

    /**
     * Indicates that the client should switch to a different protocol such as TLS/1.0.
     */
    public const UPGRADEREQUIRED = 426;

    /**
     * Indicates that the origin server requires the request to be conditional.
     */
    public const PRECONDITIONREQUIRED = 428;

    /**
     * Indicates that the user has sent too many requests in a given amount of time.
     */
    public const TOOMANYREQUESTS = 429;

    /**
     * Indicates that the server is unwilling to process the request because its header fields are too large.
     */
    public const REQUESTHEADERFIELDSTOOLARGE = 431;

    /**
     * Indicates that the server is denying access to the resource as a consequence of a legal demand.
     */
    public const UNAVAILABLEFORLEGALREASONS = 451;

    /**
     * Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
     */
    public const INTERNALSERVERERROR = 500;

    /**
     * Indicates that the server does not support the functionality required to fulfill the request.
     */
    public const NOTIMPLEMENTED = 501;

    /**
     * Indicates that the server, while acting as a gateway or proxy, received an invalid response from the upstream server.
     */
    public const BADGATEWAY = 502;

    /**
     * Indicates that the server is currently unable to handle the request due to a temporary overload or scheduled maintenance.
     */
    public const SERVICEUNAVAILABLE = 503;

    /**
     * Indicates that the server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
     */
    public const GATEWAYTIMEOUT = 504;

    /**
     * Indicates that the server does not support the HTTP protocol version used in the request.
     */
    public const HTTPVERSIONNOTSUPPORTED = 505;

    /**
     * Indicates that the server has an internal configuration error.
     */
    public const VARIANTALSONEGOTIATES = 506;

    /**
     * Indicates that the server is unable to store the representation needed to complete the request.
     */
    public const INSUFFICIENTSTORAGE = 507;

    /**
     * Indicates that the server detected an infinite loop while processing a request.
     */
    public const LOOPDETECTED = 508;

    /**
     * Indicates that further extensions to the request are required for the server to fulfill it.
     */
    public const NOTEXTENDED = 510;

    /**
     * Indicates that the client needs to authenticate to gain network access.
     */
    public const NETWORKAUTHENTICATIONREQUIRED = 511;

    /**
     * Check if the status code is informational (1xx).
     *
     * @return bool
     */
    public function isInformational(): bool
    {
        return $this->value >= 100 && $this->value < 200;
    }

    /**
     * Check if the status code is successful (2xx).
     *
     * @return bool
     */
    public function isSuccess(): bool
    {
        return $this->value >= 200 && $this->value < 300;
    }

    /**
     * Check if the status code is a redirection (3xx).
     *
     * @return bool
     */
    public function isRedirection(): bool
    {
        return $this->value >= 300 && $this->value < 400;
    }

    /**
     * Check if the status code is a client error (4xx).
     *
     * @return bool
     */
    public function isClientError(): bool
    {
        return $this->value >= 400 && $this->value < 500;
    }

    /**
     * Check if the status code is a server error (5xx).
     *
     * @return bool
     */
    public function isServerError(): bool
    {
        return $this->value >= 500 && $this->value < 600;
    }
}
