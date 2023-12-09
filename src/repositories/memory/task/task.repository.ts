import { TaskRepository as TaskRepositoryContract } from "~/contracts/repositories/task/task.repository";
import { Status } from "~/core/status";
import { Task } from "~/core/task";
import { FiltersEnum } from "~/enum/task/filters";
import { StatusEnum } from "~/enum/task/status";
import { ResourceException } from "~/exception/ResourceException";

export class TaskRepositoryMemo implements TaskRepositoryContract {
    constructor(
        private database: Task[] = []
    ) {}
    
    async getAll(): Promise<Task[]> {
        return this.database;
    }

    async getAllByUserId(userId: number): Promise<Task[]> {
        const userTasks = this.database.filter(task => task.userRef === userId);
        return userTasks.map(task => Task.restore({
            id: task._id,
            description: task.description,
            finishAt: task.finishAt,
            status: task._status,
            title: task.title
        }, userId));
    }

    async getAllByFilter(filter: FiltersEnum, value: string): Promise<Task[]> {
        const filterValueSelected = value.toString();
        
        if(filter == 'status') {
            return this.database.filter(taskPersist => taskPersist['_status']._props.description.toString() === filterValueSelected);
        }
        
        return this.database.filter(taskPersist => new Date(taskPersist['finishAt']).toISOString() === filterValueSelected);
    }

    async findById(taskId: number): Promise<Task> {
        const task = this.database.find(taskPersist => taskPersist._id === taskId);
        
        if(!task) {
            throw ResourceException.notFound({ field: 'task' });
        }

        return Task.restore({
            id: task._id,
            title: task.title,
            description: task.description,
            status: task._status,
            finishAt: task.finishAt
        }, task?.userRef);
    }
    
    async create(task: Task): Promise<Task> {
        const createTask = Task.restore({
            id: Math.floor(Math.random() * 9999),
            title: task.title,
            description: task.description,
            finishAt: task.finishAt,
            status: task._status
        }, task.userRef);

        this.database.push(createTask);

        return createTask;
    }

    async delete(task: Task): Promise<void> {
        const databaseFiltered: Task[] = this.database.filter(taskPersist => taskPersist._id !== task._id);
        this.database = databaseFiltered;
    }

    async update(updatedTask: Task, taskId: number): Promise<void>{
        const task = this.database.find(taskPersist => taskPersist._id === taskId);

        if(!task) {
            throw ResourceException.notFound({ field: 'updatedTask'});
        }
        
        const databaseFiltered: Task[] = this.database.filter(taskPersist => taskPersist._id !== updatedTask._id);

        this.database = databaseFiltered;
        this.database.push(updatedTask);
    }

    async complete(taskId: number): Promise<void> {
        const task = this.database.find(taskPersist => taskPersist._id === taskId);

        if(!task) {
            throw ResourceException.notFound({ field: 'task' });
        }

        const databaseFiltered: Task[] = this.database.filter(taskPersist => taskPersist._id !== taskId);
        
        task.withStatus(Status.restore({ description: StatusEnum.COMPLETED }, 2));
        
        this.database = databaseFiltered;
        this.database.push(task);
    }
}