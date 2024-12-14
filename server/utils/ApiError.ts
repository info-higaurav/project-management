import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import ApiResponse from "./ApiResponse";

export default function handleApiError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err)
    if (err instanceof ZodError) {
        const errorMessages = err.errors.map(error => ({
            field: error.path.join('.'),
            message: error.message
        }));
        return ApiResponse.failure(
            [errorMessages],
            errorMessages[0].message,
            400
        ).send(res);
    }

   
}