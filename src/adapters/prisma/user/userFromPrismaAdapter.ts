import {
    User as UserModel
 } from "@prisma/client";
import { User } from "~/core/user";


export class UserFromPrismaAdapter {
    static convert({ id, firstName, lastName, email, password }: UserModel): User {
        return User.restore({
            firstName,
            lastName,
            email,
            password
        }, id);
    }
}