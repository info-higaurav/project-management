import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user/user.services";
import ApiResponse from "../utils/ApiResponse";
import ProjectServices from "../services/project/project.services";
import { projectValidation } from "../services/project/project.validation";

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

export const createProject = async(req:Request, res:Response, next:NextFunction)=>{
    const project = req.body;
    const userId = (req as any).user._id;
    const validateProject = projectValidation.parse(project);


    const service = new UserServices();
    const isUserExists = await service.getUser(userId);
    const isManagerExists = await service.getUser(req.body.projectManagerId);


    if(isUserExists?.userRole === "admin"){
        if(isManagerExists?.userRole === "manager"){
            const projectService = new ProjectServices();
            const response = await projectService.createProject(validateProject);
            return ApiResponse.success(response,"Project created successfully", 200).send(res);
        }else{
            return ApiResponse.failure([], "Manager not found", 404).send(res);
        }
        
    }
    return ApiResponse.failure([], "Unauthorized", 401).send(res);

}
export const getProjects = async(req:Request, res:Response, next:NextFunction)=>{
    const userId = (req as any).user._id;
    const service = new UserServices();
    const isUserExists = await service.getUser(userId)
    const projectService = new ProjectServices();

    
    if(isUserExists?.userRole === "admin"){
        
        const response = await projectService.getProjectlist();
        if(response.length !== 0 && response !== null){
            return ApiResponse.success(response , "Project list fetch successfully", 200).send(res);
        }
        
        return ApiResponse.success([], "Currently there are no projects", 200).send(res);
    }

    if(isUserExists?.userRole === "manager"){
        const response = await projectService.myProject(userId)
        return ApiResponse.success(response, "Project list fetch successfully", 200).send(res);
    }

    return ApiResponse.failure([],"Unauthorized",401).send(res);
}
