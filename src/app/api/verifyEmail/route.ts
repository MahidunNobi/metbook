import connect from "@/dbConfig/connect";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";

connect()

export async function POST(req:NextRequest){

    try {
        const reqBody = await req.json()
        const {token} = reqBody
        // Check if user exists
        const user = await User.findOne({verifyToken: token})
        if(!user){
            return NextResponse.json({message: "Invalid Token"}, {status: 400})
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save()      
        return NextResponse.json({message: "User Verified", success: true}, {status: 200})
        
    } catch (error:any) {
        return NextResponse.json({success:false, message: error.message}, {status: 400})
    }

}