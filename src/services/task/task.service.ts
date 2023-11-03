import { TaskRepository } from "@repositories/task/task.repository";
import { TaskService as TaskServiceContract } from "~/contracts/services/task/task.service";
import { Task } from "~/core/task";
import { CreateTaskRequestDTO, TaskProps } from "~/dtos/task/task";

export class TaskService implements TaskServiceContract {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    async getAll(): Promise<Task[]> {
        return this.taskRepository.getAll();
    }

    async create(createTaskRequestBody: CreateTaskRequestDTO): Promise<void> {
        const task = Task.create(createTaskRequestBody);
        await this.taskRepository.create(task);
    }

    async delete(taskId: Pick<TaskProps, 'id'>): Promise<void> {
        const task = await this.taskRepository.findById(taskId);
        
        await this.taskRepository.delete(task);
    }
}