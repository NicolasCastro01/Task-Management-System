export interface TaskProps {
    readonly id?: number;
    readonly title: string;
    readonly description: string;
    readonly finishAt: Date;
}

export class TaskRequestDTO {
    readonly id?: number;
    readonly title: string;
    readonly description: string;
    readonly finishAt: Date;

    constructor(props: TaskProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.finishAt = props.finishAt;
    }
}

export class CreateTaskRequestDTO extends TaskRequestDTO {
    constructor(props: TaskProps) {
        super(props);
    }
}

export class DeleteTaskRequestDTO extends TaskRequestDTO {
    constructor(props: TaskProps) {
        super(props);
    }
}