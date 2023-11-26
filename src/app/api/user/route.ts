import connect from "@/dbConfig/connect";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModels";
import Post from "@/models/postModel";
import Comments from "@/models/commentModel";


connect()

export async function POST(req:NextRequest){
    const reqBody = await req.json()
    const {id} = reqBody    
    const user = await User.findById(id).populate({
                                        path: "posts",
                                        model: Post,
                                        populate: [{
                                            path: "author",
                                            select: "_id username email img country city"
                                        },
                                        {
                                            path: "comments",
                                            model: Comments,
                                            populate: {
                                                path: "user",
                                                select: "username img _id"
                                            }
                                        }],
                                        
                                            })
    const {city, country, email, img, mobile, posts, username, _id} = user

    return NextResponse.json({message: "User data fatched", success: true, user: {city, country, email, img, mobile, posts, username, _id}})
    
}