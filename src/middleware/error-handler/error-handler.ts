import { NextFunction, Request, Response } from "express";
import { Exception } from "~/exception/Exception";
import { ApiError } from "~/helper/api-error/api-error";

export class ErrorHandler {
    
    private constructor() {
        //
    }

    static init(error: Error & Partial<ApiError> & Exception<null>, request: Request, response: Response, next: NextFunction): void {
        const statusCode = error.statusCode ?? 500;
        
        response.status(statusCode).send({error: error.message, details: error.getDetails});
    }
}