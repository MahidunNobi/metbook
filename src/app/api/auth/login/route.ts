import connect from "@/dbConfig/connect";
import mongoose, { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(req:NextRequest) {
    try {        
        const reqBody = await req.json()
        const {username, password} = reqBody
        
        const user = await User.findOne({username})
        if(!user){
        return NextResponse.json({message: "User not found", success:false}, {status: 400})
        }
        else if(!user.isVerified){
            return NextResponse.json({message: "Please verify your email first"}, {status: 400})
        }
        const passwordValidation = await bcryptjs.compare(password, user.password)
        if(!passwordValidation){
            return NextResponse.json({message: "Password did not match", success: false}, {status: 400})
        }    

        const tokenData = {
            username: user.username,
            id: user._id,
            email: user.email,
        }
        
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})
        
        const {city, country, mobile, img}= user

        const response = NextResponse.json({message: "Loged In successfully", userData: {...tokenData, city, country, mobile, img}}, {status: 200})
        
        response.cookies.set("token", token)
        
        return response

    } catch (e) {
        const error = e as MongooseError
        return NextResponse.json({message: error.message, success: false}, {status: 400})
    }
}