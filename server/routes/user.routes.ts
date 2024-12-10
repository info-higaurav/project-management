import { Router } from "express";
import AsyncHanlder from "../utils/AsyncHandler";

import { healthCheckup, login, signup } from "../controllers/user.controller";
import handleApiError from "../utils/ApiError";

const userRoute = Router();

userRoute.route("/health").get(AsyncHanlder(healthCheckup))
userRoute.route("/signup").post(AsyncHanlder(signup))
userRoute.route("/login").post(AsyncHanlder(login))

// Error handling middleware should be last
userRoute.use(handleApiError)

export default userRoute;
