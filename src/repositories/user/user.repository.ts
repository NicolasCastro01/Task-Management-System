import { PrismaClient } from "@prisma/client";
import { UserFromPrismaAdapter } from "~/adapters/prisma/user/userFromPrismaAdapter";
import { UserRepository as UserRepositoryContract } from "~/contracts/repositories/user/user.repository";
import { User } from "~/core/user";
import { ResourceException } from "~/exception/ResourceException";

export class UserRepository implements UserRepositoryContract {
    constructor(
        private readonly prismaClient: PrismaClient
    ) { }

    async findById(userId: number): Promise<User> {
        const user = await this.prismaClient.user.findUnique({ where: { id: userId }, include: { Task: { include: { status: true } } } });
        
        if(!user) {
            throw ResourceException.notFound({ field: 'user' });
        }

        return UserFromPrismaAdapter.convert(user);
    }

    async create(user: User): Promise<void> {
        await this.prismaClient.user.create({
            data: {
                firstName: user._props.firstName,
                lastName: user._props.lastName,
                email: user._props.email,
                password: user._props.password
            }
        });
    }
    
    async findByEmail(email: string): Promise<User>{
        const user = await this.prismaClient.user.findUnique({ where: { email }, include: { Task: { include: { status: true } } }});

        if(!user) {
            throw ResourceException.notFound({ field: 'user' });
        }

        return UserFromPrismaAdapter.convert(user);
    }
}