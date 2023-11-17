import { NextFunction, Request, Response } from "express";
import { ValidationException } from "~/exception/ValidationException";
import { JwtService } from "~/services/Jwt/jwt.service";

export class AuthMiddleware {
    private constructor() {
        //
    }

    static async init(request: Request, response: Response, next: NextFunction): Promise<void> {
        const authorization = request.headers.authorization;

        if(!authorization) {
            throw ValidationException.invalid({ field: 'token', rule: 'missing' });
        }
        
        const [prefix, token] = authorization.split(' ');
        
        if(!token) {
            throw ValidationException.invalid({ field: 'token', rule: 'missing' });
        }

        const jwtService = new JwtService();
        const isValidToken = await jwtService.verify(token);

        if(!isValidToken) {
            throw ValidationException.invalid({ field: 'token', rule: 'invalid' });
        }

        next();
    }
}