import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", isAuthenticated, logout);

export default authRouter;