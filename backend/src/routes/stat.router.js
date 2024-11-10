import { Router } from "express";

const statRouter = Router();

statRouter.get("/", (req, res) => console.log("auth route setup"));

export default statRouter;