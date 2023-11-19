import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    caption: {
        type: String,
        required: [true, "Please write a Caption"]
    },
    images: {
        type: [String]        
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: [true, "Please give me an authors"],
        ref: "user"
    },    
    likers: {
        type: [String]
    },    
    comments: [{type: mongoose.Types.ObjectId, ref: "comments"}]
    ,    
    
}, {
    timestamps: true
})

const Post  = mongoose.models.post || mongoose.model("post", postSchema)

export default Post