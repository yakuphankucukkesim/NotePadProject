import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    category: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model('Note', noteSchema);