import { Router } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import { createProject, createTask, getManagers, getProjects, getUsers } from "../controllers/admin.controllers";
import verifyUser from "../middleware/user/verify.user";
import handleApiError from "../utils/ApiError";
import { getMyTask } from "../controllers/user.controllers";

const adminRoutes = Router();

adminRoutes.route("/users").get(verifyUser,AsyncHandler(getUsers));
adminRoutes.route("/projects")
    .post(verifyUser,AsyncHandler(createProject))
    .get(verifyUser,AsyncHandler(getProjects));

adminRoutes.route("/managers")
    .get(verifyUser, AsyncHandler(getManagers));
    

adminRoutes.use(handleApiError)

export default adminRoutes;