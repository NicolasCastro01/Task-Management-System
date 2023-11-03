interface TaskProps {
    id: number;
    title: string;
    description: string;
    finishAt: Date;
}

type CreateTaskProps = Omit<TaskProps, 'id'>;

export class Task {
    private readonly _id?: number;
    private readonly _title: string;
    private readonly _description: string;
    private readonly _finish_at: Date;

    private constructor(props: Omit<TaskProps, 'id'>, id?: number) {
        this._id = id;
        this._title = props.title;
        this._description = props.description,
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
}