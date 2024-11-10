import { Router } from "express";

const songRouter = Router();

songRouter.get("/", (req, res) => console.log("auth route setup"));

export default songRouter;