import songModel from "../models/song.model.js";
import userModel from "../models/user.model.js";
import albumModel from "../models/album.model.js";

export const getStats = async (req, res, next) => {
    try {
        const [totalUsers, totalSongs, totalAlbums, uniqueArtists] = await Promise.all([
            userModel.countDocuments(),
            songModel.countDocuments(),
            albumModel.countDocuments(),

            songModel.aggregate([
                {
                    $unionWith: {
                        coll: "albummodels",
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist"
                    }
                },
                {
                    $count: "count"
                }
            ])
        ]);

        res.status(200).json({ success: true, result: { totalUsers, totalSongs, totalAlbums, totalArtists: uniqueArtists[0]?.count || 0 } })
    } catch (error) {
        next(error);
    }
}