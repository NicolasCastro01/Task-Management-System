import { Task } from "~/core/task";
import { CreateTaskRequestDTO, UpdateTaskRequestDTO } from "~/dtos/task/task";
import { FiltersEnum } from "~/enum/task/filters";

export interface TaskService { 
    getAll(): Promise<Task[]>;
    findById(taskId: number): Promise<Task>;
    getAllByFilter(filter: FiltersEnum, value: string): Promise<Task[]>;
    create(createTaskRequestBody: CreateTaskRequestDTO): Promise<Task>;
    delete(taskId: number): Promise<boolean>;
    update(updatedTask: UpdateTaskRequestDTO, userRef: number): Promise<void>;
    complete(taskId: number): Promise<void>;
}