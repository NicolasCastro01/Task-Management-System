import { NextFunction, Request, Response } from "express";
import { EXPIRES_IN } from "~/config/app";
import { AuthenticationException } from "~/exception/AuthenticationException";
import { AuthorizationException } from "~/exception/AuthorizationException";
import { ValidationException } from "~/exception/ValidationException";
import { JwtService } from "~/services/Jwt/jwt.service";

export class AuthMiddleware {
    private constructor() {
        //
    }

    static async init(request: Request, response: Response, next: NextFunction): Promise<void> {
        const jwtService = new JwtService();
        const authorization = request.headers['authorization'];

        if (!authorization) {
            throw ValidationException.invalid({ field: 'token', rule: 'invalidFormat' });
        }

        const [prefix, token] = authorization.split(' ');

        if (!token) {
            throw AuthenticationException.unauthorized();
        }

        try {
            await jwtService.verify(token);

            next();
        } catch (error) {
            throw AuthorizationException.forbidden();
        }
    }
}