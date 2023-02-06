import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    siteId: {
       type: String,
       required: true 
    },
    facilityType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    unavailableDates: {
        type: [Date]
    },
    isRestricted: {
        type: Boolean,
        default: false
    },
    features: {
        withCisco: {
            type: Boolean,
            default: false
        }
    }
    //rooms: [{ roomName: String, description: String, capacity: {type: Number, required: true},unavailableDates: { type: [Date] }, isRestricted: {type: Boolean, default: false}, features: { withCisco: { type: Boolean, default: false}} }],
},
{ timestamps: true }
);

export default mongoose.model("Room", RoomSchema)