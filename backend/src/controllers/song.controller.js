import songModel from "../models/song.model.js"
import userModel from "../models/user.model.js";

export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await songModel.find().sort({ createdAt: -1 }) //-1 means sorting in descending order
        res.status(200).json({ success: true, result: { songs } })
    } catch (error) {
        next(error);
    }
}

export const getFeaturedSongs = async (req, res, next) => {
    try {
        const featuredSongs = await songModel.aggregate([
            { $sample: { size: 6 } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ]);

        res.status(200).json({ success: true, result: { featuredSongs } });
    } catch (error) {
        next(error);
    }
}

export const getRecomendedSongs = async (req, res, next) => {
    try {
        const currentUserClerkId = req.auth.userId;
        const users = await userModel.findOne({ clerkId: currentUserClerkId }).populate({
            path: 'mostPlayedSongs.song',  // Path to the song field inside the mostPlayedSongs array
            model: 'songModel'                 // Ensure you're populating from the Song model
        });

        const songs = users.mostPlayedSongs || [];

        const topFourSongs = songs.sort((a, b) => b.count - a.count).slice(0, 4); //sort the array in descending order and give first 4

        res.status(200).json({ success: true, result: { recomendedSongs: topFourSongs } });
    } catch (error) {
        next(error);
    }
}

export const getFavouriteSongs = async (req, res, next) => {
    try {
        const currentUserClerkId = req.auth.userId;
        const user = await userModel.findOne({ clerkId: currentUserClerkId }).populate("favouriteSongs");

        res.status(200).json({ success: true, result: { favouriteSongs: user.favouriteSongs } });
    } catch (error) {
        next(error);
    }
}

export const addSongToFavourite = async (req, res, next) => {
    try {
        const { songId } = req.params;
        const currentUserClerkId = req.auth.userId;

        await userModel.findOneAndUpdate({ clerkId: currentUserClerkId }, {
            // $push: { favouriteSongs: songId }
            $addToSet: { favouriteSongs: songId } //it will only add if it doesn't exists already unline push
        })

        res.status(200).json({ success: true, result: {} });
    } catch (error) {
        next(error);
    }
}

export const removeSongFromFavourite = async (req, res, next) => {
    try {
        const { songId } = req.params;
        const currentUserClerkId = req.auth.userId;

        await userModel.findOneAndUpdate({ clerkId: currentUserClerkId }, {
            $pull: { favouriteSongs: songId }
        })

        res.status(200).json({ success: true, result: {} });
    } catch (error) {
        next(error);
    }
}

export const songPlayedByUser = async (req, res, next) => {
    try {
        const { songId } = req.params;
        const currentUserClerkId = req.auth.userId;

        const result = await userModel.findOneAndUpdate(
            { clerkId: currentUserClerkId, "mostPlayedSongs.song": songId },
            { $inc: { "mostPlayedSongs.$.count": 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        if (!result) {
            await userModel.findOneAndUpdate(
                { clerkId: currentUserClerkId },
                {
                    $push: { mostPlayedSongs: { song: songId, count: 1 } }
                },
                { new: true }
            );
        }

        res.status(200).json({ success: true, result: {} });
    } catch (error) {
        next(error);
    }
}