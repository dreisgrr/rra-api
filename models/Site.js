import mongoose from "mongoose";

const SiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rooms: {
        type: [String],
    }
});

export default mongoose.model("Site", SiteSchema)