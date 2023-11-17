import { User } from "~/core/user";
import { CredentialsToRegisterDTO } from "~/dtos/auth/auth";

export interface UserService { 
    findById(userId: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(credentials: CredentialsToRegisterDTO): Promise<void>;
}