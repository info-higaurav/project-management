import { Response , Request} from "express"
import ApiResponse from "../utils/ApiResponse"

export const healthCheckup = async( _:Response , res:Response)=>{
   return ApiResponse.success([],"User routes are OK !", 200).send(res)
}