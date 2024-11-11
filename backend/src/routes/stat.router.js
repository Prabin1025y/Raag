import { Router } from "express";
import { getStats } from "../controllers/stat.controller.js";

const statRouter = Router();

statRouter.get("/", getStats);

export default statRouter;