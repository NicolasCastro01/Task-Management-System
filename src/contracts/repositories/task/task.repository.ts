import { Task } from "~/core/task";
import { TaskProps } from "~/dtos/task/task";

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    findById(taskId: Pick<TaskProps, 'id'>): Promise<Task>;
    create(task: Task): Promise<void>;
    delete(task: Task): Promise<void>;
}