import { TaskRepository as TaskRepositoryContract } from "~/contracts/repositories/task/task.repository";
import { Task } from "~/core/task";
import { UpdatedTask } from "~/dtos/task/task";
import { StatusEnum } from "~/enum/task/status";

export class TaskRepositoryMemo implements TaskRepositoryContract {
    constructor(
        private database: Task[] = []
    ) {}
    
    async getAll(): Promise<Task[]> {
        return this.database;
    }
    
    async findById(taskId: number): Promise<Task | undefined> {
        const task = this.database.find(taskPersist => taskPersist.id === taskId);
        
        return task;
    }
    
    async create(task: Task): Promise<void> {
        this.database.push(task);
    }

    async delete(task: Task): Promise<void> {
        const databaseFiltered: Task[] = this.database.filter(taskPersist => taskPersist.id !== task.id);
        this.database = databaseFiltered;
    }

    async update(updatedTask: UpdatedTask): Promise<void>{
        const task = this.database.filter(taskPersist => taskPersist.id === updatedTask.id)[0];

        if(!task) {
            return;
        }
        
        const databaseFiltered: Task[] = this.database.filter(taskPersist => taskPersist.id !== updatedTask.id);
        const taskUpdated = Task.restore({
            id: updatedTask.id,
            title: updatedTask.title ? updatedTask.title : task.title,
            description: updatedTask.description ? updatedTask.description : task.description,
            status: updatedTask.status ? updatedTask.status : task.status,
            finishAt: updatedTask.finish_at ? updatedTask.finish_at : task.finishAt
        });

        this.database = databaseFiltered;
        this.database.push(taskUpdated);
    }

    async complete(taskId: number): Promise<void> {
        const task = this.database.filter(taskPersist => taskPersist.id === taskId)[0];

        if(!task) {
            return;
        }

        const databaseFiltered: Task[] = this.database.filter(taskPersist => taskPersist.id !== taskId);
        
        task.withStatus(StatusEnum.COMPLETED);

        this.database = databaseFiltered;
        this.database.push(task);
    }
}