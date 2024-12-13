import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user/user.services";
import ApiResponse from "../utils/ApiResponse";

export const getUsers = async(req:Request, res:Response, next:NextFunction)=>{
    const user = (req as any).user;
    const service = new UserServices();
    const userData = await service.getUser(user._id);
   
    if(userData?.userRole !== "admin"){
        return ApiResponse.failure([], "Unauthorized", 401).send(res);
    }
    const response = await service.getUsers();
    return ApiResponse.success(response,"Users fetched successfully", 200).send(res)
}