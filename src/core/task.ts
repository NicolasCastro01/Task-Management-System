import { StatusEnum } from "~/enum/task/status";

interface TaskProps {
    id: number;
    title: string;
    description: string;
    status?: StatusEnum;
    finishAt: Date;
}

type CreateTaskProps = Omit<TaskProps, 'id'>;

export class Task {
    private _id?: number;
    private _title: string;
    private _description: string;
    private _status: StatusEnum;
    private _finish_at: Date;

    private constructor(props: Omit<TaskProps, 'id'>, id?: number) {
        this._id = id || Math.floor(Math.random() * 100000000);
        this._title = props.title;
        this._description = props.description,
        this._status = props.status || StatusEnum.PENDING;
        this._finish_at = props.finishAt;
    }

    static create(props: CreateTaskProps): Task {
        return new Task(props);
    }

    static restore(props: TaskProps): Task {
        return new Task(props, props.id);
    }

    get id(): Number | undefined {
        return this._id;
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

    get status(): StatusEnum {
        return this._status;
    }

    withStatus(status: StatusEnum) {
        this.changeStatus(status);
    }

    private changeStatus(status: StatusEnum) {
        this._status = status;
    }
}