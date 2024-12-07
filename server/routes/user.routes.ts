import { Router } from "express";
import AsyncHanlder from "../utils/AsyncHandler";

import { healthCheckup } from "../controllers/user.controller";

const userRoute = Router();

userRoute.route("/health").get(AsyncHanlder(healthCheckup))

export default userRoute;