import { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
import { addSong, deleteSong, createAlbum, deleteAlbum, editSong, editAlbum } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.use(isAuthenticated, isAdmin);

// adminRouter.get("/checkAdmin", (req, res) => res.status(200).json({ success: true, result: { isAdmin: true } }));

adminRouter.post("/addSong", addSong);
adminRouter.post("/editSong/:songId", editSong);
adminRouter.delete("/deleteSong/:songId", deleteSong);

adminRouter.post("/createAlbum", createAlbum);
adminRouter.post("/editAlbum/:albumId", editAlbum);
adminRouter.delete("/deleteAlbum/:albumId", deleteAlbum);


export default adminRouter;