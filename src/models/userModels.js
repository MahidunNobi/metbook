import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    country: {
        type: String,
        required: [true, "Please provide a country name"]        
    },
    city: {
        type: String,
        required: [true, "Please provide a city name"]        
    },
    mobile: {
        type: String,
        required: [true, "Please provide a mobile No."]        
    },
    img: {
        type: String            
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: "posts"
    }],
    
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.user || mongoose.model("user", userSchema)

export default User