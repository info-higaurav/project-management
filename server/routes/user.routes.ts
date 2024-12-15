import { Router } from "express";

import verifyUser from "../middleware/user/verify.user";
import AsyncHanlder from "../utils/AsyncHandler";
import handleApiError from "../utils/ApiError";
// importing controller
import { 
    login,
    logout,
    signup
 } from "../controllers/user.controllers";

const userRoute = Router();

userRoute.route("/signup").post(AsyncHanlder(signup))
userRoute.route("/login").post(AsyncHanlder(login))
userRoute.route("/logout").get(verifyUser , AsyncHanlder(logout))

userRoute.use(handleApiError)

export default userRoute;
