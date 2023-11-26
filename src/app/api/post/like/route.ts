import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/connect";
import Post from "@/models/postModel";
import jwt from "jsonwebtoken"
import { JwtPayload, dbPostType, postType } from "@/types/type";

connect()

export async function POST(req:NextRequest){
const reqBody = await req.json()
const {_id} = reqBody
const token = req.cookies.get("token")
if(!token){
    return NextResponse.json({message: "Token missing!"})
}
const {name, value} = token
const tokenData = jwt.decode(value) as JwtPayload   
const {username}= tokenData
const post = await Post.findById(_id) as dbPostType
const exists = post.likers.filter(ele => ele === username)
exists.length>0 ? post.likers = post.likers.filter(ele => ele !== username) : post.likers.push(username)
await post.save()

return NextResponse.json({message: "Liked Successfully", success: true, post: post})

}