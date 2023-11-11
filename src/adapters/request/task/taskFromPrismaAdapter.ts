import {
    Task as TaskModel,
    Status
} from "@prisma/client";
import { Task } from "~/core/task";
import { StatusFromPrismaAdapter } from "../status/statusFromPrisma";

type TaskMapper = TaskModel & {
    status: Status
};

export class TaskFromPrismaAdapter {
    static convert({ id, title, description, status, finishAt, }: TaskMapper): Task {
        return Task.restore({
            id,
            title,
            description,
            status: StatusFromPrismaAdapter.convert(status),
            finishAt
        });
    }
}