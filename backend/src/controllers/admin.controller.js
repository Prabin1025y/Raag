import uploadToCloudinary from "../lib/uploadToCloudinary.js";
import albumModel from "../models/album.model.js";
import songModel from "../models/song.model.js";

export const addSong = async (req, res, next) => {
    try {

        if (!req.files || !req.files.imageFile || !req.files.audioFile)
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

        res.status(200).json({ success: true, result: { song } });

    } catch (error) {
        next(error);
    }
}

export const editSong = async (req, res, next) => {
    try {
        const { songId } = req.params;
        const { title, artist, duration, albumId } = req.body;
        const audioFile = req.files?.audioFile;
        const imageFile = req.files?.imageFile;


        const updateFields = { title, artist, duration, albumId };

        if (audioFile) {
            const audioUrl = await uploadToCloudinary(audioFile);
            updateFields.audioUrl = audioUrl;
        }
        if (imageFile) {
            const imageUrl = await uploadToCloudinary(imageFile);
            updateFields.imageUrl = imageUrl;
        }



        const song = await songModel.findByIdAndUpdate(songId, updateFields);

        if (albumId !== "") {
            await albumModel.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            })

            await albumModel.findByIdAndUpdate(albumId, {
                $addToSet: { songs: song._id }
            });
        }

        res.status(200).json({ success: true, result: { song } });

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

        res.status(200).json({ success: true, result: { song } });

    } catch (error) {
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        if (!req.files || !req.files.imageFile)
            return res.status(400).json({ success: false, message: "Please Upload an album thumbnail." });

        const { title, artist } = req.body;
        const imageFile = req.files.imageFile;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = await albumModel.create({
            title,
            artist,
            imageUrl
        })

        await album.save();

        res.status(200).json({ success: true, result: { album } });

    } catch (error) {
        next(error);
    }
}
export const editAlbum = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const { title, artist } = req.body;
        const imageFile = req.files?.imageFile;

        const updateFields = { title, artist };
        if (imageFile) {
            const imageUrl = await uploadToCloudinary(imageFile);
            updateFields.imageUrl = imageUrl;
        }

        const album = await albumModel.findByIdAndUpdate(albumId, updateFields);


        res.status(200).json({ success: true, result: { album } });

    } catch (error) {
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { albumId } = req.params;

        await songModel.deleteMany({ albumId });
        const album = await albumModel.findByIdAndDelete(albumId);

        res.status(200).json({ success: true, result: { album } })
    } catch (error) {
        next(error);
    }
}