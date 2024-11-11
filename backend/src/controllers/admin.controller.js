import uploadToCloudinary from "../lib/uploadToCloudinary.js";
import albumModel from "../models/album.model.js";
import songModel from "../models/song.model.js";

export const addSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.imageFile || !req.file.audioFile)
            return res.status(401).json({ success: false, message: "Please upload all required files." });

        const { title, artist, duration, albumId } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new songModel({
            title,
            artist,
            duration,
            audioUrl,
            imageUrl,
            albumId: albumId || null,
        });

        await song.save();

        if (albumId)
            await albumModel.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            });


    } catch (error) {
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { songId } = req.params;

        const song = await songModel.findById(songId);

        if (song.albumId) {
            await albumModel.findByIdAndUpdate(song.albumId, {
                $pull: { songs: songId }
            });
        }

        await songModel.findByIdAndDelete(songId);

        res.status(200).json({ success: true, result: song });

    } catch (error) {
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        if (!req.files || !req.files.imageFile)
            return res.status(400).json({ success: false, message: "Please Upload an album thumbnail." });

        const { albumTitle, releaseYear, artist } = req.body;
        const imageFile = req.files.imageFile;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = await albumModel.create({
            title: albumTitle,
            releaseYear,
            artist,
            imageUrl
        })

        await album.save();

        res.status(200).json({ success: true, result: album });

    } catch (error) {
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { albumId } = req.params;

        await songModel.deleteMany({ albumId });
        const album = await albumModel.findByIdAndDelete(albumId);

        res.status(200).json({ success: true, result: album })
    } catch (error) {
        next(error);
    }
}