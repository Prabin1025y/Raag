import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/", (req, res) => console.log("auth route setup"));

export default adminRouter;