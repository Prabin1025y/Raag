import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", isAuthenticated, getAllUsers);

export default userRouter;