import songModel from "../models/song.model";

export const addSong = (req, res, next) => {
    try {
        if (!req.files || !req.files.imageFile || !req.file.audioFile)
            return res.status(401).json({ success: false, message: "Please upload all required files." });

        const { title, artist, duration, albumId } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const song = new songModel({
            title,
            artist,
            duration,
            albumId: albumId || null,
            
        })
    } catch (error) {
        next(error);
    }
}