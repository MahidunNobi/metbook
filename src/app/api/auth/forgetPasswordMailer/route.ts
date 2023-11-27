import connect from "@/dbConfig/connect"
import mongoose from "mongoose"
import { NextResponse, NextRequest } from "next/server"
import User from "@/models/userModels"
import bcryptjs from "bcryptjs"
import { sendMail } from "@/helpers/mailer"

connect()

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const {username} = reqBody
        // Check if user exists
        const user = await User.findOne({username})
        if(!user){
            return NextResponse.json({message: "User doesn't exists"}, {status: 400})
        }

        const sendMailObj = {
            email:user.email, 
            emailType: "RESET",
            userId: user
           }
        sendMail(sendMailObj)

       return NextResponse.json({message: "Check your email to reset Password", success:true})

    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 400})
    }
}