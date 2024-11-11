import albumModel from "../models/album.model.js"

export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await albumModel.find();
        res.status(200).json({ success: true, result: { albums } });
    } catch (error) {
        next(error);
    }
}

export const getAlbumById = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const album = await albumModel.findById(albumId).populate("songs");

        if (!album)
            res.status(400).json({ success: false, message: "Album does not exists" });

        res.status(200).json({ success: true, result: { album } });
    } catch (error) {
        next(error);
    }
}