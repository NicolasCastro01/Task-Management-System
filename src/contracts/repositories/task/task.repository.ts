import { Task } from "~/core/task";
import { FiltersEnum } from "~/enum/task/filters";

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    getAllByUserId(userId: number): Promise<Task[]>;
    getAllByFilter(filter: FiltersEnum, value: string): Promise<Task[]>;
    findById(taskId: number): Promise<Task>;
    create(task: Task): Promise<Task>;
    delete(task: Task): Promise<void>;
    update(updatedTask: Task, taskId: number): Promise<void>;
    complete(taskId: number): Promise<void>;
}