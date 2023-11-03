import { Task } from "~/core/task";

interface TaskProps {
    _id: number;
    _title: string;
    _description: string;
    _finish_at: string;
}

export class TaskFromPrismaAdapter {
    static convert({ _id, _title, _description, _finish_at }: TaskProps): Task {
        return Task.restore({
            id: _id,
            title: _title,
            description: _description,
            finishAt: new Date(_finish_at)
        });
    }
}