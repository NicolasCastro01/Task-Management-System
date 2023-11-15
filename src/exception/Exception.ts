import { ApiError } from "~/helper/api-error/api-error";

export class Exception<T> extends ApiError {
    private readonly _details: (T | null)[];

    constructor(message: string, statusCode: number) {
        super(message, statusCode)
        this._details = [];
    }

    addDetails(detail: T) {
        this._details.push(detail);
    }

    get getDetails(): (T | null)[] {
        return this._details;
    }
}