import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// -------------USING THE PROTECTED ROUTE-----------------
// export function middleware(req:NextRequest){
//     const path= req.nextUrl.pathname
//     const isProtectedRoute = path.startsWith("/feed") || path.startsWith("/groups") || path.startsWith("/watch") || path.startsWith("/marketplace") || path.startsWith("/profile")
//     const token = req.cookies.get("token")?.value||""
    
//     if(isProtectedRoute && token===""){
//         return NextResponse.redirect(new URL("/login", req.nextUrl))    
//     }
// }

// -------------USING THE PUBLIC ROUTE-----------------

export function middleware(req:NextRequest){
    const path= req.nextUrl.pathname
    
    const isPublicRoute = path.startsWith("/login") || path.startsWith("/signup") || path ==="/"
    const token = req.cookies.get("token")?.value||""    
    if(isPublicRoute && token){
        return NextResponse.redirect(new URL("/feed", req.nextUrl))    
    }else if(!isPublicRoute && token===""){        
        return NextResponse.redirect(new URL("/login", req.nextUrl))            
    }
}

export const config={
    matcher: [
        "/login",
        "/signup",
        '/forgetpassword',
        "/feed",
        "/groups",
        "/watch",
        "/marketplace",
        "/profile/:path*"
    ]
}
