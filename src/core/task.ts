import { StatusEnum } from "~/enum/task/status";
import { Status } from "./status";
import { Entity } from "~/common/core/entity/entity";

interface TaskProps {
    id?: number;
    title: string;
    description: string;
    status: Status;
    finishAt: Date;
}

interface CreateTaskProps extends Omit<TaskProps, 'id' | 'status'> { }
interface RestoreTaskProps extends TaskProps { }

export class Task extends Entity<TaskProps> {
    private readonly id?: number;
    private readonly _userRef: number;

    private constructor(props: TaskProps, userRef: number, id?: number) {
        super(props);
        this.id = id;
        this._userRef = userRef;
    }

    static create({ title, description, finishAt }: CreateTaskProps, userRef: number): Task {
        return new Task({
            title,
            description,
            status: Status.restore({ description: StatusEnum.PENDING }, 1),
            finishAt
        }, userRef);
    }

    static restore({ id, title, description, status, finishAt }: RestoreTaskProps, userRef: number): Task {
        return new Task({
            title,
            description,
            status: Status.restore({ description: status._props.description }, status._id),
            finishAt
        }, userRef, id);
    }

    get _id(): number {
        return Number(this.id);
    }

    get userRef(): number {
        return Number(this._userRef);
    }

    get title(): string {
        return this.props.title;
    }

    get description(): string {
        return this.props.description;
    }

    get finishAt(): Date {
        return this.props.finishAt;
    }

    get _status(): Status {
        return this.props.status;
    }

    withStatus(status: Status) {
        this.changeStatus(status);
    }

    private changeStatus(status: Status) {
        this.props.status = Status.restore({ description: status._props.description }, status._id);
    }
}