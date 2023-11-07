import { Task } from "~/core/task";
import { UpdatedTask } from "~/dtos/task/task";

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    findById(taskId: number): Promise<Task | undefined>;
    create(task: Task): Promise<void>;
    delete(task: Task): Promise<void>;
    update(updatedTask: UpdatedTask): Promise<void>;
}