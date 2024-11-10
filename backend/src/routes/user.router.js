import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => console.log("auth route setup"));

export default userRouter;