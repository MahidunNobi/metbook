import connect from "@/dbConfig/connect";
import mongoose from "mongoose";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import {sendMail} from "@/helpers/mailer";

connect()

export async function POST (req: NextRequest){
    try {

        const reqBody = await req.json()
        const {username, email, password} = reqBody

        // Check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({message: "User Already Exists"}, {status: 400})
        }
        // Hash the Password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Creating user
        const NewUser = new User({
            ...reqBody,
            password: hashedPassword
        })
        // Saving the new User to DB
       const savedUser = await NewUser.save()
       const sendMailObj = {
        email:savedUser.email, 
        emailType: "Verify",
        userId: savedUser._id
       }

       await sendMail(sendMailObj)

       return NextResponse.json({message: "User Created successfully!", success:true})

        
    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 300})
    }
}