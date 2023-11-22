import {
    User as UserModel
 } from "@prisma/client";
import { User } from "~/core/user";
import { TaskFromPrismaAdapter, TaskMapper } from "../task/taskFromPrismaAdapter";

type UserMapper = UserModel & {
    Task: TaskMapper[]
}

export class UserFromPrismaAdapter {
    static convert({ id, firstName, lastName, email, password, Task }: UserMapper): User {
        return User.restore({
            firstName,
            lastName,
            email,
            password,
            tasks: Task.map(TaskFromPrismaAdapter.convert)
        }, id);
    }
}