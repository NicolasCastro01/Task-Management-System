import { User } from "~/core/user";

export interface UserRepository {
    findById(userId: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(user: User): Promise<void>;
}