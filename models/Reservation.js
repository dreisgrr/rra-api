import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    requestor: {
        type: String,
        required: true
    },
    domainId: {
        type: String,
        required: true
    },
    siteId: {
        type: String,
        required: true,
    },
    reservationStatus: {
        type: String,
        required: true
    },
    reservationStartTime: {
        type: Date,
        required: true,
        default: null
    },
    reservationEndTime: {
        type: Date,
        required: true,
        default: null
    },
    facilityType: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    pax: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: false
    },
    occupants: {
        type: [String],
        required: false
    },
    position: {
        type: String,
        required: false
    },
    shiftSchedule: {
        type: String,
        required: false
    },
    lineOfBusinessOrTower: {
        type: String,
        required: false
    },
    actionTaken: {
        performedBy: {
            type: String,
            required: false,
            default: ''
        },
        performedDate: {
            type: Date,
            required: false,
            default: null
        },
        action: {
            type: String,
            required: false,
            default: '',
        },
        remarks: {
            type: String,
            required: false,
            default: '',
        }
    }
    
}, {timestamps: true});

export default mongoose.model("Reservation", ReservationSchema)