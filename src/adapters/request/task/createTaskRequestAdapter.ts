import { CreateTaskRequestDTO } from "~/dtos/task/task";

export interface CreateTaskRequestBody {
    title: string;
    description: string;
    finish_at: string;
    user_id: number;
}

export class CreateTaskRequestDTOAdapter {
    static convert({ title, description, finish_at }: CreateTaskRequestBody, userRef: number): CreateTaskRequestDTO {
        return new CreateTaskRequestDTO({
            title,
            description,
            finishAt: new Date(finish_at),
            userRef
        });
    }
}