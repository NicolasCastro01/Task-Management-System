import { TaskFromPrismaAdapter } from "~/adapters/request/task/taskFromPrismaAdapter";
import { TaskRepository as TaskRepositoryContract } from "~/contracts/repositories/task/task.repository";
import { Task } from "~/core/task";
import { TaskProps } from "~/dtos/task/task";

export class TaskRepository implements TaskRepositoryContract {
    constructor(
        private database: Task[] = []
    ) {}
    
    async getAll(): Promise<Task[]> {
        return this.database;
    }
    
    async findById(taskId: Pick<TaskProps, "id">): Promise<Task> {
        const task = this.database.find(taskPersist => taskPersist.id === taskId);
        
        if(!task) {
            throw new Error('Task not found.');
        }
        
        return task;
    }
    
    async create(task: Task): Promise<void> {
        this.database.push(task);
    }

    async delete(task: Task): Promise<void> {
        const databaseFiltered: Task[] = this.database.filter(taskPersist => taskPersist.id !== task.id);
        this.database = databaseFiltered;
    }
}