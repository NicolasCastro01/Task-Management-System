import { Request, Response } from "express";
import { Task } from "~/core/task";
import { CreateTaskRequestDTOAdapter } from "~/adapters/request/task/createTaskRequestAdapter";
import { UpdateTaskRequestAdapter } from "~/adapters/request/task/updateTaskRequestAdapter";
import { TaskService } from "~/contracts/services/task/task.service";
import { ValidationException } from "~/exception/ValidationException";

export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }
    
    async getAll(request: Request, response: Response): Promise<Response<Task[], Record<string, Task>>>{
        const tasks = await this.taskService.getAll();
        return response.status(200).send(tasks.map(task => task._props));
    }

    async getAllByFilter(request: Request, response: Response): Promise<Response<Task[], Record<string, Task>>> {
        const queryFilterType = request.query.filterBy;
        const hasNotFilterType = !queryFilterType;
        
        if (hasNotFilterType) {
            throw ValidationException.invalid({ field: 'filter', rule: 'empty' });
        }

        const queryFilterValue = request.query.filterValue;
        const hasNotFilterValue = !queryFilterValue;
        
        if (hasNotFilterValue) {
            throw ValidationException.invalid({ field: 'filterValue', rule: 'empty' });
        }
        
        const filterType = queryFilterType.toString();
        const filterValue = queryFilterValue.toString();

        const tasks = await this.taskService.getAllByFilter(Object(filterType), Object(filterValue));
        
        return response.status(200).send(tasks);
    }

    async create(request: Request, response: Response): Promise<void> {
        const createTaskDTO = CreateTaskRequestDTOAdapter.convert(request.body);
        const createdTask = await this.taskService.create(createTaskDTO)

        response.status(201).send(createdTask);
    }

    async delete(request: Request, response: Response): Promise<void> {
        const taskId = this.getTaskIdFromParams(request);
        
        await this.taskService.delete(taskId);
        
        response.status(200).send();
    }
    
    async update(request: Request, response: Response): Promise<void> {
        const taskId = this.getTaskIdFromParams(request);
        const hasNotTaskId = !Boolean(taskId);
        
        if(hasNotTaskId) {
            throw ValidationException.invalid({ field: "taskId", rule: "empty" });
        }

        const updatedTask = UpdateTaskRequestAdapter.convert(request.body, taskId);
            
        await this.taskService.update(updatedTask);
        
        response.status(200).send();
    }

    async complete(request: Request, response: Response): Promise<void> {
        const taskId = this.getTaskIdFromParams(request);
        const hasNotTaskId = !Boolean(taskId);
        
        if(hasNotTaskId) {
            throw ValidationException.invalid({ field: "taskId", rule: "empty" });
        }

        await this.taskService.complete(taskId);

        response.status(200).send();
    }

    private getTaskIdFromParams(request: Request): number {
        return Number(request.params.taskId);
    }
}