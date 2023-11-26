"use client"
import LeftSideBar from "@/components/LeftSideBar/leftSidebar"
import Rightsidebar from "@/components/RightSideBar/rightSidebar"
import { UserContext } from "@/context/UserContext"
import { useContext } from "react"

export default function SidebarLayout({
    children
}:{
    children: React.ReactNode
}){

    const context = useContext(UserContext)
    const {img, username, _id} = context.state
    return(
        <section>
            <div className="relative container mx-auto md:flex md:justify-between md:gap-6">
            <LeftSideBar img={img} _id={_id} usrNm={username} />
            {children}
            <Rightsidebar/>
            </div>            
        </section>
    )
}