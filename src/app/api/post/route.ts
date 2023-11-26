import connect from "@/dbConfig/connect";
import Post from "@/models/postModel";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import  jwt  from "jsonwebtoken"; 
import Comments from "@/models/commentModel";
import { JwtPayload } from "@/types/type";

connect()

export async function POST(req:NextRequest){
    try {

        const token = req.cookies.get("token")
        
        
        if(!token){
            return NextResponse.json({message: "Please Login first/ Token Didn't found"}, {status: 400})
        }
        const {name, value} = token

        const verifiedToken = jwt.verify(value, process.env.TOKEN_SECRET)
        if(!verifiedToken){
            return NextResponse.json({message: "Token verify faild"}, {status: 400})
        }
        const tokenData = jwt.decode(value) as JwtPayload       
        const {username}= tokenData
        const user = await User.findOne({username:username})
        

        const reqBody = await req.json()

        const newPost = new Post({
            ...reqBody,
            author: user._id
        })

        const res = await newPost.save()
        
        user.posts.push(res._id)
        await user.save()       

        return NextResponse.json({message: "Post Created Successfully", success: true})
        
    } catch (error:any) {
        return NextResponse.json({success: false, message: error.message}, {status: 400})
    }
}

export async function GET(req:NextRequest){
    const res = await Post.find()
                .populate("author", "_id username email img country city")
                .populate({
                    path: "comments",
                    model: Comments,
                    populate: {
                        path: "user",
                        select: "username img _id"
                    }
                })
    return NextResponse.json({posts: res, success: true})
}