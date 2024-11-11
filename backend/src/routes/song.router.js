import { Router } from "express";
import { addSongToFavourite, getAllSongs, getFavouriteSongs, getFeaturedSongs, getRecomendedSongs, removeSongFromFavourite, songPlayedByUser } from "../controllers/song.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const songRouter = Router();

songRouter.get("/", getAllSongs);
songRouter.get("/featured", getFeaturedSongs);
songRouter.get("/recomended", isAuthenticated, getRecomendedSongs);
songRouter.get("/favourite", isAuthenticated, getFavouriteSongs);

songRouter.get("/add-to-favourite/:songId", isAuthenticated, addSongToFavourite);
songRouter.get("/remove-from-favourite/:songId", isAuthenticated, removeSongFromFavourite);
songRouter.get("/song-played/:songId", isAuthenticated, songPlayedByUser);

export default songRouter;