import { Router } from "express";
import AsyncHanlder from "../utils/AsyncHandler";

import { healthCheckup, login, profile, signup } from "../controllers/user.controller";
import handleApiError from "../utils/ApiError";
import verifyUser from "../middleware/user/verify.user";

const userRoute = Router();

userRoute.route("/health").get(AsyncHanlder(healthCheckup))
userRoute.route("/signup").post(AsyncHanlder(signup))
userRoute.route("/login").post(AsyncHanlder(login))
userRoute.route("/profile").get(verifyUser, AsyncHanlder(profile))

// Error handling middleware should be last
userRoute.use(handleApiError)

export default userRoute;
