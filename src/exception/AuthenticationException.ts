import { Exception } from "./Exception"

enum AuthenticationHttpCode {
    UNAUTHORIZED = 401
}

export class AuthenticationException extends Exception {
    private constructor(message: string, code: number) {
        super(message, code);
    }

    static unauthorized(): AuthenticationException {
        return new AuthenticationException("Unauthorized.", AuthenticationHttpCode.UNAUTHORIZED);
    }
}