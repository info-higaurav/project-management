import { Router } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import { createProject, getProjects, getUsers } from "../controllers/admin.controllers";
import verifyUser from "../middleware/user/verify.user";
import handleApiError from "../utils/ApiError";

const adminRoutes = Router();

adminRoutes.route("/getusers").get(verifyUser,AsyncHandler(getUsers));
adminRoutes.route("/create-project").post(verifyUser,AsyncHandler(createProject));
adminRoutes.route("/get-projects").get(verifyUser,AsyncHandler(getProjects));
adminRoutes.use(handleApiError)

export default adminRoutes;