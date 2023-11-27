import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/connect";
import jwt from "jsonwebtoken"
import User from "@/models/userModels";

export async function POST(req){
    const token  = req.cookies.get("token")
    if(!token){
        return NextResponse.json({message: "Token not found"})
    }else{
    const tokenData = jwt.decode(token.value)
    const {username} = tokenData
    const user = await User.findOne({username})
    const {username:usrNm, img, mobile, email, city, country, _id} = user

    return NextResponse.json({message: "LogedIN", success: true, user: {usrNm, img, mobile, email, city, country, _id}}, {status: 200})
    // return NextResponse.json({message: "Login Successfull", success: true}, {status: 200})
    }
    
}