import { ApiError } from "~/helper/api-error/api-error";

export class Exception<T = null> extends ApiError {
    private readonly _details: T[];

    constructor(message: string, statusCode: number) {
        super(message, statusCode)
        this._details = [];
    }

    addDetails(detail: T) {
        this._details.push(detail);
    }

    get getDetails(): T[] {
        return this._details;
    }
}