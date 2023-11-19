import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    comment:{
        type: String,
        required: [true, "Please provide a valid comment string"]
    },
    likers: {
        type: [{type: mongoose.Types.ObjectId, ref:"user"}]
    }
})

const Comments = mongoose.models.Comments || mongoose.model("Comments", commentSchema)
export default Comments