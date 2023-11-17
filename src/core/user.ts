import { Entity } from "~/common/core/entity/entity";

interface UserProps {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface CreateUserProps extends UserProps { }
interface RestoreUserProps extends UserProps { }

export class User extends Entity<UserProps> {
    private _id?: number;

    private constructor(props: UserProps, id?: number) {
        super(props);
        this._id = id;
    }

    static create(props: CreateUserProps): User {
        return new User(props);
    }

    static restore(props: RestoreUserProps, id: number): User {
        return new User(props, id);
    }

    get id(): number {
        return Number(this._id);
    }
}