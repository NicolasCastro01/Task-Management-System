import { TaskRepository } from "~/contracts/repositories/task/task.repository";
import { UserRepository } from "~/contracts/repositories/user/user.repository";
import { TaskService as TaskServiceContract } from "~/contracts/services/task/task.service";
import { Task } from "~/core/task";
import { CreateTaskRequestDTO, UpdateTaskRequestDTO } from "~/dtos/task/task";
import { FiltersEnum } from "~/enum/task/filters";

export class TaskService implements TaskServiceContract {
    constructor(
        private readonly taskRepository: TaskRepository,
        private readonly userRepository: UserRepository
    ) { }

    async getAll(): Promise<Task[]> {
        return this.taskRepository.getAll();
    }

    async findById(taskId: number): Promise<Task> {
        return this.taskRepository.findById(taskId);
    }

    async getAllByFilter(filter: FiltersEnum, value: string): Promise<Task[]> {
        return this.taskRepository.getAllByFilter(filter, value);
    }

    async create(createTaskRequestBody: CreateTaskRequestDTO): Promise<Task> {
        await this.userRepository.findById(createTaskRequestBody.userRef);
        
        const task = Task.create(createTaskRequestBody, createTaskRequestBody.userRef);

        return this.taskRepository.create(task);
    }

    async delete(taskId: number): Promise<boolean> {
        const task = await this.taskRepository.findById(taskId);
        if(task) {
            await this.taskRepository.delete(task);
            
            return true;
        }

        return false;
    }

    async update(updatedTask: UpdateTaskRequestDTO, userRef: number): Promise<void> {
        const task = await this.findById(updatedTask.id);
        const taskUpdated = Task.restore({
            id: task._id,
            title: updatedTask.title || task.title,
            description: updatedTask.description || task.description,
            status: task._status,
            finishAt: updatedTask.finish_at || task.finishAt
        }, userRef);

        await this.taskRepository.update(taskUpdated, task._id);
    }

    async complete(taskId: number): Promise<void> {
        await this.taskRepository.complete(taskId);
    }
}