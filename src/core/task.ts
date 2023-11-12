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
    private readonly id?: number;
    private readonly title: string;
    private readonly description: string;
    private status: Status;
    private readonly finish_at: Date;

    private constructor(props: Omit<TaskProps, 'id'>, id?: number) {
        this.id = id;
        this.title = props.title;
        this.description = props.description,
        this.status = props.status;
        this.finish_at = props.finishAt;
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
            status: Status.restore({ description: status._description }, status._id),
            finishAt
        }, id);
    }

    get _id(): number {
        return Number(this.id);
    }

    get _title(): string {
        return this.title;
    }

    get _description(): string {
        return this.description;
    }

    get _finishAt(): Date {
        return this.finish_at;
    }

    get _status(): Status {
        return this.status;
    }

    withStatus(status: Status) {
        this.changeStatus(status);
    }

    private changeStatus(status: Status) {
        this.status = Status.restore({ description: status._description }, status._id);
    }
}