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
    const OK = 200;

    /**
     * Indicates that the request has been fulfilled and resulted in a new resource being created.
     */
    const CREATED = 201;

    /**
     * Indicates that the request has been accepted for processing, but the processing has not been completed.
     */
    const ACCEPTED = 202;

    /**
     * Indicates that the request has been successfully processed, but is returning information that may be from another source.
     */
    const NONAUTHORITATIVEINFORMATION = 203;

    /**
     * Indicates that the server successfully processed the request, but is not returning any content.
     */
    const NOCONTENT = 204;

    /**
     * Indicates that the server successfully processed the request, but is not returning any content and requires that the requester reset the document view.
     */
    const RESETCONTENT = 205;

    /**
     * Indicates that the server is delivering only part of the resource due to a range header sent by the client.
     */
    const PARTIALCONTENT = 206;

    /**
     * Indicates that the message body that follows is an XML message and can contain multiple separate responses.
     */
    const MULTISTATUS = 207;

    /**
     * Indicates that the members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.
     */
    const ALREADYREPORTED = 208;

    /**
     * Indicates that the server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
     */
    const IMUSED = 226;

    /**
     * Indicates multiple options for the resource from which the client may choose.
     */
    const MULTIPLECHOICES = 300;

    /**
     * Indicates that the resource requested has been assigned a new permanent URI.
     */
    const MOVEDPERMANENTLY = 301;

    /**
     * Indicates that the resource requested has been temporarily moved to a different URI.
     */
    const FOUND = 302;

    /**
     * Indicates that the response to the request can be found under another URI using a GET method.
     */
    const SEEOTHER = 303;

    /**
     * Indicates that the resource has not been modified since the version specified by the request headers.
     */
    const NOTMODIFIED = 304;

    /**
     * Indicates that the requested resource is only available through a proxy, the address for which is provided in the response.
     */
    const USEPROXY = 305;

    /**
     * No longer used. Originally meant "Subsequent requests should use the specified proxy."
     */
    const UNUSED = 306;

    /**
     * Indicates that the request should be repeated with another URI, but future requests can still use the original URI.
     */
    const TEMPORARYREDIRECT = 307;

    /**
     * Indicates that the request and all future requests should be repeated using another URI.
     */
    const PERMANENTREDIRECT = 308;

    /**
     * Indicates that the server cannot or will not process the request due to an apparent client error.
     */
    const BADREQUEST = 400;

    /**
     * Indicates that the request requires user authentication.
     */
    const UNAUTHORIZED = 401;

    /**
     * Reserved for future use.
     */
    const PAYMENTREQUIRED = 402;

    /**
     * Indicates that the server understood the request, but refuses to authorize it.
     */
    const FORBIDDEN = 403;

    /**
     * Indicates that the requested resource could not be found.
     */
    const NOTFOUND = 404;

    /**
     * Indicates that the request method is not supported for the requested resource.
     */
    const METHODNOTALLOWED = 405;

    /**
     * Indicates that the requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
     */
    const NOTACCEPTABLE = 406;

    /**
     * Indicates that the client must first authenticate itself with the proxy.
     */
    const PROXYAUTHENTICATIONREQUIRED = 407;

    /**
     * Indicates that the server timed out waiting for the request.
     */
    const REQUESTTIMEOUT = 408;

    /**
     * Indicates that the request could not be processed because of conflict in the request.
     */
    const CONFLICT = 409;

    /**
     * Indicates that the resource requested is no longer available and will not be available again.
     */
    const GONE = 410;

    /**
     * Indicates that the request did not specify the length of its content, which is required by the requested resource.
     */
    const LENGTHREQUIRED = 411;

    /**
     * Indicates that the server does not meet one of the preconditions that the requester put on the request.
     */
    const PRECONDITIONFAILED = 412;

    /**
     * Indicates that the request is larger than the server is willing or able to process.
     */
    const PAYLOADTOOLARGE = 413;

    /**
     * Indicates that the URI provided was too long for the server to process.
     */
    const URITOOLONG = 414;

    /**
     * Indicates that the request entity has a media type which the server or resource does not support.
     */
    const UNSUPPORTEDMEDIATYPE = 415;

    /**
     * Indicates that the client has asked for a portion of the file, but the server cannot supply that portion.
     */
    const RANGENOTSATISFIABLE = 416;

    /**
     * Indicates that the server cannot meet the requirements of the Expect request-header field.
     */
    const EXPECTATIONFAILED = 417;

    /**
     * Indicates that the server refuses to brew coffee because it is, permanently, a teapot.
     */
    const IMATEAPOT = 418;

    /**
     * Indicates that the request was directed at a server that is not able to produce a response.
     */
    const MISDIRECTEDREQUEST = 421;

    /**
     * Indicates that the request was well-formed but was unable to be followed due to semantic errors.
     */
    const UNPROCESSABLEENTITY = 422;

    /**
     * Indicates that the resource that is being accessed is locked.
     */
    const LOCKED = 423;

    /**
     * Indicates that the request failed due to failure of a previous request.
     */
    const FAILEDDEPENDENCY = 424;

    /**
     * Indicates that the client should switch to a different protocol such as TLS/1.0.
     */
    const UPGRADEREQUIRED = 426;

    /**
     * Indicates that the origin server requires the request to be conditional.
     */
    const PRECONDITIONREQUIRED = 428;

    /**
     * Indicates that the user has sent too many requests in a given amount of time.
     */
    const TOOMANYREQUESTS = 429;

    /**
     * Indicates that the server is unwilling to process the request because its header fields are too large.
     */
    const REQUESTHEADERFIELDSTOOLARGE = 431;

    /**
     * Indicates that the server is denying access to the resource as a consequence of a legal demand.
     */
    const UNAVAILABLEFORLEGALREASONS = 451;

    /**
     * Indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
     */
    const INTERNALSERVERERROR = 500;

    /**
     * Indicates that the server does not support the functionality required to fulfill the request.
     */
    const NOTIMPLEMENTED = 501;

    /**
     * Indicates that the server, while acting as a gateway or proxy, received an invalid response from the upstream server.
     */
    const BADGATEWAY = 502;

    /**
     * Indicates that the server is currently unable to handle the request due to a temporary overload or scheduled maintenance.
     */
    const SERVICEUNAVAILABLE = 503;

    /**
     * Indicates that the server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
     */
    const GATEWAYTIMEOUT = 504;

    /**
     * Indicates that the server does not support the HTTP protocol version used in the request.
     */
    const HTTPVERSIONNOTSUPPORTED = 505;

    /**
     * Indicates that the server has an internal configuration error.
     */
    const VARIANTALSONEGOTIATES = 506;

    /**
     * Indicates that the server is unable to store the representation needed to complete the request.
     */
    const INSUFFICIENTSTORAGE = 507;

    /**
     * Indicates that the server detected an infinite loop while processing a request.
     */
    const LOOPDETECTED = 508;

    /**
     * Indicates that further extensions to the request are required for the server to fulfill it.
     */
    const NOTEXTENDED = 510;

    /**
     * Indicates that the client needs to authenticate to gain network access.
     */
    const NETWORKAUTHENTICATIONREQUIRED = 511;

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
