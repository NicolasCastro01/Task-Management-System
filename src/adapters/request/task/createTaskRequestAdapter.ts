import { CreateTaskRequestDTO } from "~/dtos/task/task";

interface CreateTaskRequestBody {
    title: string;
    description: string;
    finish_at: string;
}

export class CreateTaskRequestDTOAdapter {
    static convert({ title, description, finish_at }: CreateTaskRequestBody): CreateTaskRequestDTO {
        return new CreateTaskRequestDTO({
            title,
            description,
            finishAt: new Date(finish_at)
        });
    }
}