import { TaskRepositoryMemo } from "@repositories/task/task.repository";
import { TaskService as TaskServiceContract } from "~/contracts/services/task/task.service";
import { Task } from "~/core/task";
import { CreateTaskRequestDTO, UpdateTaskRequestDTO } from "~/dtos/task/task";
import { StatusEnum } from "~/enum/task/status";

export class TaskService implements TaskServiceContract {
    constructor(
        private readonly taskRepository: TaskRepositoryMemo = new TaskRepositoryMemo()
    ) { }

    async getAll(): Promise<Task[]> {
        return this.taskRepository.getAll();
    }

    async getAllByStatus(status: StatusEnum): Promise<Task[]> {
        return this.taskRepository.getAllByStatus(status);
    }

    async create(createTaskRequestBody: CreateTaskRequestDTO): Promise<void> {
        const task = Task.create(createTaskRequestBody);
        await this.taskRepository.create(task);
    }

    async delete(taskId: number): Promise<boolean> {
        const task = await this.taskRepository.findById(taskId);
        if(task) {
            await this.taskRepository.delete(task);
            
            return true;
        }

        return false;
    }

    async update(updatedTask: UpdateTaskRequestDTO): Promise<void> {
        await this.taskRepository.update(updatedTask);
    }

    async complete(taskId: number): Promise<void> {
        await this.taskRepository.complete(taskId);
    }
}