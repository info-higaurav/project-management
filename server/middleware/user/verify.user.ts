import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import ApiResponse from '../../utils/ApiResponse';

// Extend Request type to include user property
interface AuthRequest extends Request {
    user?: any;
}

const verifyUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;
    if(!token){
        return ApiResponse.failure([], "Access token is required", 401).send(res);
    }
    const deccode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    if(!deccode){
        return ApiResponse.failure([], "Invalid access token", 401).send(res);
    }
    req.user = deccode;
    next();
} catch (error) {
    return ApiResponse.failure([], "Invalid access token", 401).send(res);
}
}

export default verifyUser