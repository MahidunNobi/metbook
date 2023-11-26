import {NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/connect";
import jwt from "jsonwebtoken"
import User from "@/models/userModels";
import { JwtPayload } from "@/types/type";

// interface JwtPayload{
//     username: string,
//     _id: string,
//     email: string
// }

connect()

export async function POST(req:NextRequest){
    const token  = req.cookies.get("token")
    if(!token){
        return NextResponse.json({message: "Token not found"})
    }else{
    const tokenData = jwt.verify(token.value, process.env.TOKEN_SECRET) as JwtPayload
    const {username} = tokenData
    const user = await User.findOne({username})
    const {img, mobile, email, city, country, _id} = user

    return NextResponse.json({message: "LogedIN", success: true, user: {username, img, mobile, email, city, country, _id}}, {status: 200})
    // return NextResponse.json({message: "Login Successfull", success: true}, {status: 200})
    }
    
}