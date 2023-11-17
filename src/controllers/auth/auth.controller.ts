import { UserService } from "~/contracts/services/user/user.service";
import { JwtService } from "~/services/Jwt/jwt.service";
import * as bcrypt from "bcrypt";
import { ValidationException } from "~/exception/ValidationException";
import { Request, Response } from "express";
import { Credentials, CredentialsDTO, CredentialsToRegisterDTO } from "~/dtos/auth/auth";

export class AuthController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async login(request: Request, response: Response): Promise<void> {
        const { email, password } = request.body as CredentialsDTO;
        const user = await this.userService.findByEmail(email);
        const isValidPassword = bcrypt.compareSync(password, user._props.password);
        
        if(!isValidPassword) {
            throw ValidationException.invalid({ field: 'password', rule: 'invalid' });
        }

        const token = await this.jwtService.sign({ sub: user.id }, { expiresIn: '3600s' });
        
        response.status(200).send({ auth_token: token });
    }

    async register(request: Request, response: Response): Promise<void> {
        const body = request.body as Credentials;
        const credentialsDTO = new CredentialsToRegisterDTO(body);

        await this.userService.create(credentialsDTO);

        response.status(201).send();
    }
}