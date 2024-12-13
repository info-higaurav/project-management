import { Router } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import { createProject, getUsers } from "../controllers/admin.controllers";
import verifyUser from "../middleware/user/verify.user";

const adminRoutes = Router();

adminRoutes.route("/getusers").get(verifyUser,AsyncHandler(getUsers));
adminRoutes.route("/create-project").post(verifyUser,AsyncHandler(createProject));

export default adminRoutes;