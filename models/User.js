import {model, models, mongoose, Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    image: {
        type: String
    },
    bookmarks: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Property'
        }
    ]
}, {
    timestamps: true
}, { bufferCommands: false })

export default mongoose.models.User || mongoose.model('User', userSchema)