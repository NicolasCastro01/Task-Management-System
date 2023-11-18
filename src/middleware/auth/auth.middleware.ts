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
        const refreshToken = request.cookies['refreshToken'];
        
        if(!authorization) {
            throw ValidationException.invalid({ field: 'token', rule: 'invalid' });
        }
        
        const [prefix, token] = authorization.split(' ');
        
        if(!token) {
            throw ValidationException.invalid({ field: 'token', rule: 'missing' });
        }

        try {
            await jwtService.verify(token);

            next();
        } catch (error) {
            if(!refreshToken) {
                throw ValidationException.invalid({ field: 'token', rule: 'invalid' });
            }

            try {
                const decoded = await jwtService.verify(refreshToken);
                const accessToken = await jwtService.sign({ sub: decoded.sub }, { expiresIn: EXPIRES_IN });
          
                response
                  .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
                  .send({ auth_token: accessToken });
              } catch (error) {
                throw ValidationException.invalid({ field: 'refreshToken', rule: 'invalid' });
              }
        }
    }
}