import { Router } from "express";
import { checkAdmin, checkAuth, login, logout, signup } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.get("/checkAuth", checkAuth);
authRouter.get("/checkAdmin", checkAdmin);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", isAuthenticated, logout);

export default authRouter;