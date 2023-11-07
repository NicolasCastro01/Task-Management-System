import { Task } from "~/core/task";
import { TaskProps } from "~/dtos/task/task";

export class UpdateTaskRequestToEntityAdapter {
    static convert(props: TaskProps): Task{
        
        return Task.restore({
            id: Number(props.id),
            ...props
        });
    }
}