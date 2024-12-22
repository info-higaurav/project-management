import {Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import ApiResponse from "./ApiResponse";

export default function handleApiError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ZodError) {
        console.log('ZodError structure:', JSON.stringify(err, null, 2));
        const statusCode = 500;
        const message = err.issues[0]?.message || "Internal Server Error";
        return ApiResponse.failure([], message, statusCode).send(res);
    }
}