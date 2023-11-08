import { Task } from "~/core/task";
import { CreateTaskRequestDTO, UpdateTaskRequestDTO } from "~/dtos/task/task";
import { StatusEnum } from "~/enum/task/status";

export interface TaskService { 
    getAll(): Promise<Task[]>;
    getAllByStatus(status: StatusEnum): Promise<Task[]>;
    create(createTaskRequestBody: CreateTaskRequestDTO): Promise<void>;
    delete(taskId: number): Promise<boolean>;
    update(updatedTask: UpdateTaskRequestDTO): Promise<void>;
    complete(taskId: number): Promise<void>;
}