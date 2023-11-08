import { Task } from "~/core/task";
import { UpdatedTask } from "~/dtos/task/task";
import { StatusEnum } from "~/enum/task/status";

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    getAllByStatus(status: StatusEnum): Promise<Task[]>;
    findById(taskId: number): Promise<Task | undefined>;
    create(task: Task): Promise<void>;
    delete(task: Task): Promise<void>;
    update(updatedTask: UpdatedTask): Promise<void>;
    complete(taskId: number): Promise<void>;
}