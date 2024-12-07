import { Response } from "express";

class ApiResponse {
    // Using union type to allow array or object
    data: any[] | Record<string, any>;
    message: string;
    statusCode: number;

    constructor(data: any[] | Record<string, any>, message: string, statusCode: number) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }

    static success(data: any[] | Record<string, any>, message: string, statusCode: number = 200) {
        return new ApiResponse(data, message, statusCode);
    }

    static failure(data: any[] | Record<string, any>, message: string, statusCode: number = 400) {
        return new ApiResponse(data, message, statusCode);
    }

    send(res: Response) {
        return res.status(this.statusCode).json({
            success: this.statusCode < 400,
            data: this.data,
            message: this.message
        });
    }
}

export default ApiResponse;
