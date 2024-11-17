import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { changeName, changePassword, getAllUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", isAuthenticated, getAllUsers);
userRouter.post("/change-name", isAuthenticated, changeName);
userRouter.post("/change-password", isAuthenticated, changePassword);

export default userRouter;