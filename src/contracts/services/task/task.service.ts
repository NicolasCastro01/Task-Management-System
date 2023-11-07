import { CreateTaskRequestDTO, TaskProps } from "~/dtos/task/task";

export interface TaskService { 
    getAll(): Promise<any>;
    create(createTaskRequestBody: CreateTaskRequestDTO): Promise<void>;
    delete(taskId: number): Promise<boolean>;
}