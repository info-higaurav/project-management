import { NextFunction, Request, Response } from "express";
import { UserServices } from "../services/user/user.services";
import ApiResponse from "../utils/ApiResponse";
import ProjectServices from "../services/project/project.services";
import { projectValidation } from "../services/project/project.validation";
import validateTask from "../services/task/task.validation";
import TaskServices from "../services/task/task.services";
import userRoute from "../routes/user.routes";
import OrganizationServices from "../services/orgnization/orgnization.services";

export const getUsers = async(req:Request, res:Response, next:NextFunction)=>{
    const user = (req as any).user;
    const service = new UserServices();
    const userData = await service.getUser(user._id);
   
    // if(userData?.userRole !== "admin" && userData?.userRole !== "manager"){
    //     return ApiResponse.failure([], "Unauthorized", 401).send(res);
    // }
    if(userData?.userRole === "admin" || userData?.userRole === "manager"){
        const response = await service.getUsers();
        return ApiResponse.success(response,"Users fetched successfully", 200).send(res)
    }
    return ApiResponse.failure([], "Unauthorized", 401).send(res);
    
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
            return ApiResponse.success(response,"Project created successfully", 201).send(res);
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

export const getManagers = async(req:Request, res:Response, next:NextFunction)=>{
    const userId = (req as any).user._id;
    const userServices = new UserServices();
    const whoMadeRequest = await userServices.getUser(userId);
   
    if(whoMadeRequest?.userRole !== "admin"){
        return ApiResponse.failure([], "Unauthorized", 401).send(res);
    }
    const managerList = await userServices.getManagers();
    console.log(managerList)
    if(managerList.length === 0){
        return ApiResponse.failure([],"No  found",401).send(res)
    }
    return ApiResponse.success(managerList, "Manager list fetched successfully", 200).send(res);
    

}

export const createOrganization = async(req:Request, res:Response, next:NextFunction)=>{
    const organization = req.body;
    const userId = (req as any).user._id;
    const payload = {...organization, createdBy:userId}
    const organizationService = new OrganizationServices();
    const response = await organizationService.createOrganization(payload);
    return ApiResponse.success(response, "Organization created successfully", 200).send(res);
}

export const getOrganizations = async(req:Request, res:Response, next:NextFunction)=>{
    const organizationService = new OrganizationServices();
    const response = await organizationService.getOrganizations();
    return ApiResponse.success(response, "Organization list fetched successfully", 200).send(res);
}

