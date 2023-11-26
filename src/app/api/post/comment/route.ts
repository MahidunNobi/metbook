import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/connect";
import Comments from "@/models/commentModel";
import Post from "@/models/postModel";
import jwt from "jsonwebtoken"
import User from "@/models/userModels";
import { JwtPayload } from "@/types/type";

connect()

export async function POST(req:NextRequest){
    const reqBody = await req.json()
    const {postId, comment} = reqBody

    const token = req.cookies.get("token")
    if(!token){
        return NextResponse.json({message: "Token missing!"})
    }
    const tokenData = jwt.decode(token.value)as JwtPayload
    const{username} = tokenData    

    const commenter = await User.findOne({username})

    const newComment = new Comments({
        comment: comment,
        user: commenter._id
    })
    const resComment = await newComment.save()
    const finalComment = await resComment.populate({path: "user", select: "img username _id"})

    const postRes = await Post.findById(postId)
    
    postRes.comments.push(resComment._id)
    const finalPost = await postRes.save()

    return NextResponse.json({message: "Commented on post is successfull", success: true, data: finalComment})

}