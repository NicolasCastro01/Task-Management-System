import { Request, Response } from "express";
import { TaskService } from "@services/task/task.service";
import { Task } from "~/core/task";
import { CreateTaskRequestDTOAdapter } from "~/adapters/request/task/createTaskRequestAdapter copy";
import { UpdateTaskRequestAdapter } from "~/adapters/request/task/updateTaskRequestAdapter";

export class TaskController {
    private readonly taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
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
        const { taskId } = request.params;
        
        const result = await this.taskService.delete(Number(taskId));
        
        if(!result) {
            response.status(422).send({ msg: 'ResourceError: Not found.'});
            
            return;
        }
        response.status(200).send();
    }
    
    async update(request: Request, response: Response): Promise<void> {
        const taskId = Number(request.params.taskId);
        const hasNotTaskId = !Boolean(taskId);
        
        if(hasNotTaskId) {
            response.status(403).send({ msg: 'ValidationError: not found task id.'});
            return;
        }

        const updatedTask = UpdateTaskRequestAdapter.convert(request.body, taskId);
            
        await this.taskService.update(updatedTask);
        
        response.status(200).send();
    }
}