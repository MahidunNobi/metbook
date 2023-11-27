import connect from "@/dbConfig/connect";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect()

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const {newPassword, token} = reqBody
        // Check if user exists
        const user = await User.findOne({forgotPasswordToken: token})
        if(!user){
            return NextResponse.json({message: "User not exists!"}, {status: 400})
        }
        
        // Hashing the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)

        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        user.password = hashedPassword

        const resetComplete = await user.save()   
         return NextResponse.json({message: "Reset completed", success: true})

    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 400})
    }
}