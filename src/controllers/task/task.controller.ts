import { Request, Response } from "express";
import { TaskRepository } from "@repositories/task/task.repository";
import { TaskService } from "@services/task/task.service";
import { Task } from "~/core/task";
import { CreateTaskRequestDTOAdapter } from "~/adapters/request/task/createTaskRequestAdapter copy";

export class TaskController {
    private readonly taskService: TaskService;

    constructor() {
        this.taskService = new TaskService(new TaskRepository());
    }
    
    async getAll(request: Request, response: Response): Promise<Response<Task[], Record<string, Task>>>{
        const tasks = await this.taskService.getAll();
        return response.status(200).send(tasks);
    }

    async create(request: Request, response: Response): Promise<void> {
        const createTaskDTO = CreateTaskRequestDTOAdapter.convert(request.body);
        await this.taskService.create(createTaskDTO)

        response.status(201).send();
    }

    async delete(request: Request, response: Response): Promise<void> {
        const { taskId } = request.body;
        
        await this.taskService.delete(taskId);

        response.status(200).send();
    }
}