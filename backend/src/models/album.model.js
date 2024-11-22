import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    songs:[
        {type: mongoose.Schema.Types.ObjectId, ref: "songModel"}
    ]
    
},{timestamps: true});

const albumModel = mongoose.models.albumModel || mongoose.model("albumModel", albumSchema);
export default albumModel;