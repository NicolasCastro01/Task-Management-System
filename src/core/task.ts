import { StatusEnum } from "~/enum/task/status";
import { Status } from "./status";

interface TaskProps {
    id: number;
    title: string;
    description: string;
    status: Status;
    finishAt: Date;
}

interface CreateTaskProps extends Omit<TaskProps, 'id' | 'status'> {}
interface RestoreTaskProps extends TaskProps { }

export class Task {
    private _id?: number;
    private _title: string;
    private _description: string;
    private _status: Status;
    private _finish_at: Date;

    private constructor(props: Omit<TaskProps, 'id'>, id?: number) {
        this._id = id;
        this._title = props.title;
        this._description = props.description,
        this._status = props.status;
        this._finish_at = props.finishAt;
    }

    static create({ title, description, finishAt }: CreateTaskProps): Task {
        return new Task({
            title,
            description,
            status: Status.restore({ description: StatusEnum.PENDING }, 1),
            finishAt
        });
    }

    static restore({ id, title, description, status, finishAt }: RestoreTaskProps): Task {
        return new Task({
            title,
            description,
            status: Status.restore({ description: status._props.description }, status._id),
            finishAt
        }, id);
    }

    get id(): number {
        return Number(this._id);
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get finishAt(): Date {
        return this._finish_at;
    }

    get status(): Status {
        return this._status;
    }

    withStatus(status: Status) {
        this.changeStatus(status);
    }

    private changeStatus(status: Status) {
        this._status = Status.restore({ description: status._props.description }, status._id);
    }
}