import { Router } from "express";
import { loginSignup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/callback", loginSignup);

export default authRouter;