export interface TaskProps {
    readonly id?: number;
    readonly title: string;
    readonly description: string;
    readonly statusId?: number;
    readonly finishAt: Date;
    readonly userRef: number;
}

export class TaskRequestDTO {
    readonly id?: number;
    readonly title: string;
    readonly description: string;
    readonly statusId?: number;
    readonly finishAt: Date;
    readonly userRef: number;

    constructor(props: TaskProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.statusId = props.statusId;
        this.finishAt = props.finishAt;
        this.userRef = props.userRef;
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

interface UpdateTaskProps extends Partial<TaskProps> {
    readonly finishAt: Date | undefined;
 }

export class UpdateTaskRequestDTO {
    readonly id: number;
    readonly title?: string;
    readonly description?: string;
    readonly finish_at?: Date | undefined;

    constructor(props: Partial<UpdateTaskProps>, id: number) {
        this.id = id;
        this.title = props.title;
        this.description = props.description;
        this.finish_at = props.finishAt;
    }
}

export interface UpdatedTask extends UpdateTaskRequestDTO {}