type StatusProps = {
    description: string;
}

type CreateStatusProps = StatusProps;
type RestoreStatusProps = StatusProps;

export class Status {
    private readonly id?: number;
    protected description: string;

    private constructor(description: string, id?: number) {
        this.description = description;
        this.id = id;
    }
    
    static create({ description }: CreateStatusProps): Status {
        return new Status(description);
    }

    static restore({ description }: RestoreStatusProps, id: number): Status {
        return new Status(description, id);
    }

    get _description(): string {
        return this.description;
    }

    get _id(): number {
        return Number(this.id);
    }
}