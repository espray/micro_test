export interface Context {
    invocationId: string;
    bindingData: any;
    bindings: any;
    log(text: any): void;
    done(err?: any, output?: {
        [s: string]: any;
    }): void;
}

export type HttpMethod = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | "PATCH";

export interface FunctionRequest {
    originalUrl: string;
    method: HttpMethod;
    query: {
        [s: string]: string;
    };
    headers: {
        [s: string]: string;
    };
    body: any;
    rawbody: any;
}

export interface FunctionResponse {
    body?: any;
    status?: number;
    headers?: {
        "content-type"?: string;
        "content-length"?: HttpStatusCodes | number;
        "content-disposition"?: string;
        "content-encoding"?: string;
        "content-language"?: string;
        "content-range"?: string;
        "content-location"?: string;
        "content-md5"?: Buffer;
        "expires"?: Date;
        "last-modified"?: Date;
        "location"?: string;
        "retry-after"?: number;
        "X-Response-Time"?: string;
        [s: string]: any;
    };
}

export enum HttpStatusCodes {
    /** 100 */
    Continue = 100,
    /** 101 */
    SwitchingProtocols = 101,
    /** 102 */
    Processing = 102,
    /** 103 */
    Checkpoint = 103,
    /** 200 */
    OK = 200,
    /** 201 */
    Created = 201,
    /** 202 */
    Accepted = 202,
    /** 203 */
    NonAuthoritativeInformation = 203,
    /** 204 */
    NoContent = 204,
    /** 205 */
    ResetContent = 205,
    /** 206 */
    PartialContent = 206,
    /** 207 */
    MultiStatus = 207,
    /** 208 */
    AlreadyReported = 208,
    /** 226 */
    IMUsed = 226,
    /** 300 */
    MultipleChoices = 300,
    /** 301 */
    MovedPermanently = 301,
    /** 302 */
    Found = 302,
    /** 303 */
    SeeOther = 303,
    /** 304 */
    NotModified = 304,
    /** 305 */
    UseProxy = 305,
    /** 306 */
    SwitchProxy = 306,
    /** 307 */
    TemporaryRedirect = 307,
    /** 308 */
    PermanentRedirect = 308,
    /** 400 */
    BadRequest = 400,
    /** 401 */
    Unauthorized = 401,
    /** 402 */
    PaymentRequired = 402,
    /** 403 */
    Forbidden = 403,
    /** 404 */
    NotFound = 404,
    /** 405 */
    MethodNotAllowed = 405,
    /** 406 */
    NotAcceptable = 406,
    /** 407 */
    ProxyAuthenticationRequired = 407,
    /** 408 */
    RequestTimeout = 408,
    /** 409 */
    Conflict = 409,
    /** 410 */
    Gone = 410,
    /** 411 */
    LengthRequired = 411,
    /** 412 */
    PreconditionFailed = 412,
    /** 413 */
    PayloadTooLarge = 413,
    /** 414 */
    URITooLong = 414,
    /** 415 */
    UnsupportedMediaType = 415,
    /** 416 */
    RangeNotSatisfiable = 416,
    /** 417 */
    ExpectationFailed = 417,
    /** 418 */
    ImATeapot = 418,
    /** 420 */
    MethodFailure = 420,
    /** 420 */
    EnhanceYourCalm = 420,
    /** 421 */
    MisdirectedRequest = 421,
    /** 422 */
    UnprocessableEntity = 422,
    /** 423 */
    Locked = 423,
    /** 424 */
    FailedDependency = 424,
    /** 426 */
    UpgradeRequired = 426,
    /** 428 */
    PreconditionRequired = 428,
    /** 429 */
    TooManyRequests = 429,
    /** 431 */
    RequestHeaderFieldsTooLarge = 431,
    /** 440 */
    LoginTimeout = 440,
    /** 444 */
    NoResponse = 444,
    /** 449 */
    RetryWith = 449,
    /** 450 */
    BlockedByWindowsParentalControls = 450,
    /** 451 */
    UnavailableForLegalReasons = 451,
    /** 451 */
    Redirect = 451,
    /** 495 */
    SSLCertificateError = 495,
    /** 496 */
    SSLCertificateRequired = 496,
    /** 497 */
    HttpRequestSentToHttpsPort = 497,
    /** 499 */
    ClientClosedRequest = 499,
    /** 498 */
    InvalidToken = 498,
    /** 499 */
    TokenRequired = 499,
    /** 499 */
    RequestWasForbiddenByAntivirus = 499,
    /** 500 */
    InternalServerError = 500,
    /** 501 */
    NotImplemented = 501,
    /** 502 */
    BadGateway = 502,
    /** 503 */
    ServiceUnavailable = 503,
    /** 504 */
    GatewayTimeout = 504,
    /** 505 */
    HttpVersionNotSupported = 505,
    /** 506 */
    VariantAlsoNegotiates = 506,
    /** 507 */
    InsufficientStorage = 507,
    /** 508 */
    LoopDetected = 508,
    /** 509 */
    BandwidthLimitExceeded = 509,
    /** 510 */
    NotExtended = 510,
    /** 511 */
    NetworkAuthenticationRequired = 511,
    /** 520 */
    UnknownError = 520,
    /** 521 */
    WebServerIsDown = 521,
    /** 522 */
    ConnectionTimedOut = 522,
    /** 523 */
    OriginIsUnreachable = 523,
    /** 524 */
    ATimeoutOccurred = 524,
    /** 525 */
    SSLHandshakeFailed = 525,
    /** 526 */
    InvalidSSLCertificate = 526,
    /** 530 */
    SiteIsFrozen = 530,
}

export interface HttpContext extends Context {
    res: FunctionResponse;
}