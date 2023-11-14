export class Entity<T> {
    protected props: T;

    protected constructor(props: T) {
        this.props = props;
    }

    get _props(): T {
        return this.props;
    }
}