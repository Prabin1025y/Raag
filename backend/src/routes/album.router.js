import { Router } from "express";

const albumRouter = Router();

albumRouter.get("/", (req, res) => console.log("albums route setup"));

export default albumRouter;