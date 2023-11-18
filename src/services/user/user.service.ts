import { UserRepository } from "~/contracts/repositories/user/user.repository";
import { UserService as UserServiceContract } from "~/contracts/services/user/user.service";
import { User } from "~/core/user";
import { CredentialsToRegisterDTO } from "~/dtos/auth/auth";
import * as bcrypt from "bcrypt";
import { SALT } from "~/config/app";

export class UserService implements UserServiceContract {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async findById(userId: number): Promise<User> {
        return this.userRepository.findById(userId);
    }

    async create({ firstName, lastName, email, password }: CredentialsToRegisterDTO): Promise<void> {
        const user = User.create({
            firstName,
            lastName,
            email,
            password: await bcrypt.hash(password, SALT)
        });

        await this.userRepository.create(user);
    }
    
    async findByEmail(email: string): Promise<any> {
        return this.userRepository.findByEmail(email);
    }
}