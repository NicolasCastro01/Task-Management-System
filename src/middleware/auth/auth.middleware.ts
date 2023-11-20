import { NextFunction, Request, Response } from "express";
import { EXPIRES_IN } from "~/config/app";
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
            throw ValidationException.invalid({ field: 'token', rule: 'invalid' });
        }

        const [prefix, token] = authorization.split(' ');

        if (!token) {
            throw ValidationException.invalid({ field: 'token', rule: 'missing' });
        }

        try {
            await jwtService.verify(token);

            next();
        } catch (error) {
            throw ValidationException.invalid({ field: 'token', rule: 'invalid' });
        }
    }
}