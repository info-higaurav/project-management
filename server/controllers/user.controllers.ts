import { Response , Request, NextFunction} from "express"
import ApiResponse from "../utils/ApiResponse"
import { UserServices } from "../services/user/user.services"
import TaskServices from "../services/task/task.services"

export const healthCheckup = async( _:Response , res:Response)=>{
   return ApiResponse.success([],"User routes are OK !", 200).send(res)
}

export const signup = async(req:Request, res:Response , next:NextFunction)=>{
   const userServices = new UserServices()
   
   // Validate request body against schema
   const result = await userServices.validateSignup(req.body)
   
   // Check if trying to register as restricted role
   const restrictedRoles = ["manager", "admin", "product_owner"]
   if(result.userRole && restrictedRoles.includes(result.userRole)){
      return ApiResponse.failure([], `You are not authorized to register as a ${result.userRole}`, 400).send(res)
   }

   // Check if user already exists
   const isUserExists = await userServices.isUserExists(result.emailAddress)
   if(isUserExists.length !== 0){
      return ApiResponse.failure([],"User already exists", 400).send(res);
   }

   // Create new user
   const user = await userServices.createUser(result)
   const accessToken = await userServices.accessToken(user?._id as string)
   const refreshToken = await userServices.refreshToken(user?._id as string)

    // Set tokens in cookies
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    res.cookie("accessToken", accessToken, {
       httpOnly: true,
       secure: true, 
       expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
       sameSite: "none",
       domain: process.env.NODE_ENV === "production" ? process.env.PRODUCTION_HOST : process.env.LOCALHOST
    })
    res.cookie("refreshToken", refreshToken, {
       httpOnly: true,
       secure: true,
       expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
       sameSite: "none", 
       domain: process.env.NODE_ENV === "production" ? process.env.PRODUCTION_HOST : process.env.LOCALHOST
    })
   // Set tokens in headers
   res.set({
      "Authorization": `Bearer ${accessToken}`,
      "x-refresh-token": refreshToken
   })
   
   return ApiResponse.success([user], "User created successfully", 201).send(res)
}

export const login = async(req:Request, res:Response , next:NextFunction)=>{
   const userServices = new UserServices();
   const validate = await userServices.validateLogin(req.body);
   const isUserExists = await userServices.isUserExists(req.body.emailAddress);
   if(isUserExists.length == 0){
      return ApiResponse.failure([], "User doesn't exists",400).send(res)
   }
   const verifyPass = await userServices.verifyPassword(req.body.password, isUserExists[0].password);
   if(!verifyPass){
      return ApiResponse.failure([],"password doesn't match", 400).send(res)
   } 
   const accessToken = await userServices.accessToken(isUserExists[0]?._id as string);
   const refreshToken = await userServices.refreshToken(isUserExists[0]?._id as string);
   
   // Set tokens in cookies
   res.clearCookie("accessToken")
   res.clearCookie("refreshToken")
   

   res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, 
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
      sameSite: "none",
      // domain: process.env.NODE_ENV === "production" ? process.env.PRODUCTION_HOST : process.env.LOCALHOST,
   })
   res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      sameSite: "none", 
      // domain: process.env.NODE_ENV === "production" ? process.env.PRODUCTION_HOST : process.env.LOCALHOST
   })

   // Set tokens in headers
   res.set({
      "Authorization": `Bearer ${accessToken}`,
      "x-refresh-token": refreshToken
   })

   return ApiResponse.success([],"login successfully",200).send(res);

}

export const profile = async(req:Request & {user?: any}, res:Response, next:NextFunction)=>{
   const userServices = new UserServices();
   const profile = await userServices.getUser(req.user._id);
   if(profile !== null){
      return ApiResponse.success([profile], "profile fetched successfully", 200).send(res);
   }
   return ApiResponse.failure([], "User not found", 404).send(res);
   
}

export const logout = async(req:Request, res:Response, next:NextFunction)=>{
   res.clearCookie("accessToken")
   res.clearCookie("refreshToken")
   return ApiResponse.success([], "logout successfully", 200).send(res)
}

export const getMyTask = async(req:Request, res:Response, next:NextFunction)=>{
   const userId = (req as any).user._id;
   const userSerivce = new UserServices();
   const taskService = new TaskServices();

   const isUserExists = await userSerivce.getUser(userId);
   
   if(isUserExists === null || isUserExists === undefined ){
      return ApiResponse.failure([], "user not found", 404).send(res);
   }
   const tasks = await taskService.getMyTask(userId)

   if(tasks?.length == 0){
      return ApiResponse.success([], "no tasks found", 200).send(res);
   } 
   return ApiResponse.success(tasks || [], "tasks fetched successfully", 200).send(res);
}

export const updateTaskStatus = async(req:Request, res:Response, next:NextFunction)=>{
   const userId = (req as any).user._id;
   const userSerivce = new UserServices();
   const taskService = new TaskServices();

   const isUserExists = await userSerivce.getUser(userId);
   console.log(isUserExists);
   if(isUserExists === null || isUserExists === undefined ){   
      return ApiResponse.failure([], "user not found", 404).send(res);   
   }
   const {taskId, taskStatus} = req.body;
   const task = await taskService.updateTaskStatus(taskId, taskStatus);

   return ApiResponse.success(task || [], "task status updated successfully", 200).send(res);

}
