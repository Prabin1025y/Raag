import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "albumModel"
    }
}, { timestamps: true });

const songModel = mongoose.models.songModel || mongoose.model("songModel", songSchema);
export default songModel;