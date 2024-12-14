import { Router } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import { createProject, createTask, getManagers, getProjects, getUsers } from "../controllers/admin.controllers";
import verifyUser from "../middleware/user/verify.user";
import handleApiError from "../utils/ApiError";
import { getMyTask } from "../controllers/user.controller";

const adminRoutes = Router();

adminRoutes.route("/getusers").get(verifyUser,AsyncHandler(getUsers));
adminRoutes.route("/create-project").post(verifyUser,AsyncHandler(createProject));
adminRoutes.route("/get-projects").get(verifyUser,AsyncHandler(getProjects));
adminRoutes.route("/create-task").post(verifyUser, AsyncHandler(createTask));
adminRoutes.route("/get-tasks").get(verifyUser,AsyncHandler(getMyTask))
adminRoutes.route("/get-managers").get(verifyUser, AsyncHandler(getManagers))
adminRoutes.use(handleApiError)

export default adminRoutes;