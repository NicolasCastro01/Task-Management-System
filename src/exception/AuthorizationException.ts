import { Exception } from "./Exception"

enum AuthorizationHttpCode {
    FORBIDDEN = 403
}

export class AuthorizationException extends Exception {
    private constructor(message: string, code: number) {
        super(message, code);
    }

    static forbidden(): AuthorizationException {
        return new AuthorizationException("Forbidden.", AuthorizationHttpCode.FORBIDDEN);
    }
}