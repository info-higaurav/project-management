import { Router } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import { getUsers } from "../controllers/admin.controllers";
import verifyUser from "../middleware/user/verify.user";

const adminRoutes = Router();

adminRoutes.route("/getusers").get(verifyUser,AsyncHandler(getUsers));

export default adminRoutes;