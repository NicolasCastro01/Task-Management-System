interface StatusProps {
    description: string;
}

interface CreateStatusProps extends Omit<StatusProps, 'id'>{ };
interface RestoreStatusProps extends StatusProps {};

export class Status {
    private readonly id?: number;
    protected props: StatusProps;

    private constructor(props: Omit<StatusProps, 'id'>, id?: number) {
        this.props = props;
        this.id = id;
    }
    
    static create(props: CreateStatusProps): Status {
        return new Status(props);
    }

    static restore(props: RestoreStatusProps, id: number): Status {
        return new Status(props, id);
    }

    get _props(): StatusProps {
        return this.props;
    }

    get _id(): number {
        return Number(this.id);
    }
}