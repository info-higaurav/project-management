import { Router } from "express";
import verifyUser from "../middleware/user/verify.user";
import AsyncHanlder from "../utils/AsyncHandler";
import { createTask, getProfile, getProjects } from "../controllers/managment.controllers";
import { getMyTask } from "../controllers/user.controllers";
import handleApiError from "../utils/ApiError";
import { getUsers } from "../controllers/admin.controllers";


const managmentRoute = Router();

managmentRoute.route("/users")
    .get(verifyUser, AsyncHanlder(getUsers))

managmentRoute.route("/tasks")
    .post(verifyUser, AsyncHanlder(createTask))
    .get(verifyUser, AsyncHanlder(getMyTask))

managmentRoute.route("/projects")
    .get(verifyUser, AsyncHanlder(getProjects))

managmentRoute.route("/profile")
    .get(verifyUser,(AsyncHanlder(getProfile)))

managmentRoute.use(handleApiError)
export default managmentRoute;  