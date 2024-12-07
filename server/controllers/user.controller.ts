import { Response , Request, NextFunction} from "express"
import ApiResponse from "../utils/ApiResponse"
import { UserServices } from "../services/user/user.services"

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
   res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
   })
   res.cookie("refreshToken", refreshToken, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
   })

   // Set tokens in headers
   res.set({
      "Authorization": `Bearer ${accessToken}`,
      "x-refresh-token": refreshToken
   })
   
   return ApiResponse.success([user], "User created successfully", 201).send(res)
}