import { TaskProps, UpdateTaskRequestDTO } from "~/dtos/task/task";

export class UpdateTaskRequestAdapter {
    static convert(props: Partial<TaskProps>, id: number): UpdateTaskRequestDTO{
        return new UpdateTaskRequestDTO(props, id);
    }
}