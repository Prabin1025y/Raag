import { Router } from "express";
import { checkAdmin, checkAuth, deleteAccount, login, logout, signup } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.get("/checkAuth", checkAuth);
authRouter.get("/checkAdmin/:userId", checkAdmin);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", isAuthenticated, logout);
authRouter.delete("/delete-account", isAuthenticated, deleteAccount);

export default authRouter;