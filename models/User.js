import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    domainId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        isAdmin: {
            type: Boolean,
            default: false
        },
        isFacility: {
            type: Boolean,
            default: false
        },
        isWorkforce: {
            type: Boolean,
            default: false
        },
        isManager: {
            type: Boolean,
            default: false
        },
        isAssociate: {
            type: Boolean,
            default: true
        }
    }
    
}, {timestamps: true});

export default mongoose.model("User", UserSchema)