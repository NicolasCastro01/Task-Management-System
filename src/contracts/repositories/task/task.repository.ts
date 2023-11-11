import { Task } from "~/core/task";
import { UpdatedTask } from "~/dtos/task/task";
import { FiltersEnum } from "~/enum/task/filters";

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    getAllByFilter(filter: FiltersEnum, value: string): Promise<Task[]>;
    findById(taskId: number): Promise<Task | undefined>;
    create(task: Task): Promise<Task>;
    delete(task: Task): Promise<void>;
    update(updatedTask: UpdatedTask): Promise<void>;
    complete(taskId: number): Promise<void>;
}