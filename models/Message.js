import {model, models, Schema, mongoose} from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    read: {
        type: Boolean,
        required: false
    },
    phone: {
        type: String
    },
    body: {
        type: String
    },
}, {
    timestamps: true
})

export default mongoose.models.Message || mongoose.model('Message', messageSchema)