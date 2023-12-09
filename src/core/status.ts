import { Entity } from "~/common/core/entity/entity";

type StatusProps = {
    description: string;
}

type CreateStatusProps = StatusProps;
type RestoreStatusProps = StatusProps;

export class Status extends Entity<StatusProps> {
    private readonly id?: number;

    private constructor(props: StatusProps, id?: number) {
        super(props);
        this.id = id;
    }
    
    static create(props: CreateStatusProps): Status {
        return new Status(props);
    }

    static restore(props: RestoreStatusProps, id: number): Status {
        return new Status(props, id);
    }
    
    get _id(): number {
        return Number(this.id);
    }

    get _props(): StatusProps {
        return this.props;
    }
}