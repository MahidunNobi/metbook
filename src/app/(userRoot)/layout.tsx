"use client"
import Navbar from "@/components/Navbar/navbar"
import { UserContext } from "@/context/UserContext"
import axios from "axios"
import { useContext, useEffect, useState } from "react"

export default function UserLayout({
    children
}:{
    children: React.ReactNode
}){

    const [loading, setLoading] = useState<boolean>(false)

    const context = useContext(UserContext)    
 
    const fetchUser = async()=>{
        if(context.state.username=== ""){
            try {
                setLoading(true)
                const res = await axios.post("/api/getUserData")
                context.dispatch({type: "CHANGE USER", payload: {...res.data.user}})           
            } catch (error:any) {
                console.log(error.message)
            }finally{
                setLoading(false)
            }
        }else{
            return
        }
    }

    useEffect(()=>{
        fetchUser()
    }, [])
    


    return(
        <main className="bg-gray-200">
            {loading? <h1 className=" text-3xl p-24"> Loading...</h1> 
            :
            <>
            <Navbar img={context.state.img} _id={context.state._id} />
            {children}
            </>}
        </main>
    )
}