import {
    Status as StatusModel
} from "@prisma/client";
import { Status } from "~/core/status";

export class StatusFromPrismaAdapter {
    static convert({ id, description }: StatusModel): Status {
        return Status.restore({
            description
        }, id);
    }
}