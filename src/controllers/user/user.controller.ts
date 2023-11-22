import { Request, Response } from "express";
import { JwtService } from "~/contracts/services/jwt/jwt.service";
import { UserService } from "~/contracts/services/user/user.service";
import { AuthorizationException } from "~/exception/AuthorizationException";

export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async getInfo(request: Request, response: Response): Promise<void> {
        const token = request.headers.authorization?.split(' ')[1];

        if(!token) {
            throw AuthorizationException.forbidden();
        }

        const decoded = await this.jwtService.decode(token);
        const userId = Number(decoded?.sub);
        const {_props: { password, ...user }} = await this.userService.findById(userId);        

        response.status(200).send(user);
    }
}