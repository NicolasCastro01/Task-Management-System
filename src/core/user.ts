import { Entity } from "~/common/core/entity/entity";
import { Task } from "./task";

interface UserProps {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    tasks: Task[];
}

interface CreateUserProps extends Omit<UserProps, "tasks"> { }
interface RestoreUserProps extends UserProps { }

export class User extends Entity<UserProps> {
    private _id?: number;

    private constructor(props: UserProps, id?: number) {
        super(props);
        this._id = id;
    }

    static create(props: CreateUserProps): User {
        return new User({
            ...props,
            tasks: []
        });
    }

    static restore(props: RestoreUserProps, id: number): User {
        return new User(props, id);
    }

    get id(): number {
        return Number(this._id);
    }
}