import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    mostPlayedSongs: [{
        song: { type: mongoose.Schema.Types.ObjectId, ref: "songModel" },
        count: { type: Number, default: 0 }
    }],
    favouriteSongs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "songModel"
        }
    ]
}, { timestamps: true });

const userModel = mongoose.models.userModel || mongoose.model("userModel", userSchema);

export default userModel;