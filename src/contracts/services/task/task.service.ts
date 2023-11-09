import { Task } from "~/core/task";
import { CreateTaskRequestDTO, UpdateTaskRequestDTO } from "~/dtos/task/task";
import { FiltersEnum } from "~/enum/task/filters";

export interface TaskService { 
    getAll(): Promise<Task[]>;
    getAllByFilter(filter: FiltersEnum, value: string): Promise<Task[]>;
    create(createTaskRequestBody: CreateTaskRequestDTO): Promise<void>;
    delete(taskId: number): Promise<boolean>;
    update(updatedTask: UpdateTaskRequestDTO): Promise<void>;
    complete(taskId: number): Promise<void>;
}