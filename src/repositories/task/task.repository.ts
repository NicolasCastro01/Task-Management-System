import { TaskRepository as TaskRepositoryContract } from "~/contracts/repositories/task/task.repository";
import { Task } from "~/core/task";
import { UpdatedTask } from "~/dtos/task/task";
import { FiltersEnum } from "~/enum/task/filters";
import { PrismaClient } from "@prisma/client";
import { TaskFromPrismaAdapter } from "~/adapters/request/task/taskFromPrismaAdapter";

export class TaskRepository implements TaskRepositoryContract {
  constructor(
    private readonly database: PrismaClient
  ) { }

  async getAll(): Promise<Task[]> {
    const tasks = await this.database.task.findMany({
      include: {
        status: true
      }
    });

    return tasks.map(TaskFromPrismaAdapter.convert);
  }

  async getAllByFilter(filter: FiltersEnum, value: string | number): Promise<Task[]> {
    const isDate = FiltersEnum[filter] === FiltersEnum.finishAt;
    const valueParsed = value.toString();

    const tasks = await this.database.task.findMany({
      where: {
        OR: [
          {
            statusId: isDate ? 0 : Number(valueParsed)
          },
          {
            finishAt: isDate ? new Date(valueParsed) : new Date()
          }
        ]
      },
      include: {
        status: true
      }
    });

    return tasks.map(TaskFromPrismaAdapter.convert);
  }

  async findById(taskId: number): Promise<Task> {
    const task = await this.database.task.findUnique({
      where: { id: taskId },
      include: {
        status: true
      }
    });

    if(!task) {
      throw new Error('Task not found.')
    }

    return TaskFromPrismaAdapter.convert(task);
  }

  async create({ title, description, status, finishAt }: Task): Promise<Task> {
    const taskCreated = await this.database.task.create({
      data: {
        title,
        description,
        status: {
          connect: {
            id: status._id
          }
        },
        finishAt
      },
      include: {
        status: true
      }
    });

    return TaskFromPrismaAdapter.convert(taskCreated);
  }

  async delete({ id }: Task): Promise<void> {
    await this.database.task.delete({
      where: { id }
    });
  }

  async update(updatedTask: UpdatedTask): Promise<void> {
    await this.database.task.update({
      data: {
        title: updatedTask.title,
        description: updatedTask.description,
        finishAt: updatedTask.finish_at
      },
      where: {
        id: updatedTask.id
      }
    });
  }

  async complete(taskId: number): Promise<void> {
    await this.database.task.update({
      data: {
        status: {
          connect: {
            id: 2
          }
        }
      },
      where: {
        id: taskId
      }
    });
  }
}