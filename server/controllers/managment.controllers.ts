import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user/user.services";
import ApiResponse from "../utils/ApiResponse";
import TaskServices from "../services/task/task.services";
import validateTask from "../services/task/task.validation";
import ProjectServices from "../services/project/project.services";

export const createTask = async(req:Request, res:Response, next:NextFunction)=>{
    const userId = (req as any).user._id;
    const {taskAssigneeId, associatedProjectId}=req.body;
    const payload ={...req.body,taskAssignorId:userId}
    const valTask = validateTask.parse(payload);

    const userServices = new UserServices();
    const taskServices = new TaskServices();
    const projectServices = new ProjectServices();
    const whoMadeRequest = await userServices.getUser(userId);
    const isUserExists = await userServices.getUser(taskAssigneeId);

    if(whoMadeRequest?.userRole !== "manager"){
        return ApiResponse.failure([], "Unauthorized", 401).send(res);
    }
   
    if(isUserExists?.userRole !== "user"){
        return ApiResponse.failure([], "User not found", 404).send(res);
    }
    const isProjectExists = await projectServices.isProjectValid(associatedProjectId)

    if(!isProjectExists){
        return ApiResponse.failure([], "Project not found", 404).send(res);
    }
    const createTask = await taskServices.createTask(valTask);

    return ApiResponse.success(createTask, "Task created successfully", 200).send(res);
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

export const getProfile = async(req:Request & {user?: any}, res:Response, next:NextFunction)=>{
    const userServices = new UserServices();
    const profile = await userServices.getUser(req.user._id);
    if(profile !== null){
       return ApiResponse.success([profile], "profile fetched successfully", 200).send(res);
    }
    return ApiResponse.failure([], "profile not found", 404).send(res);
    
 }