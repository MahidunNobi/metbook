import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const response = NextResponse.json({message: "Log out Sucssfully"})
    response.cookies.delete("token")
    return response
}