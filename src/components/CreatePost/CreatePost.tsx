"use client"
import { UserContext } from "@/context/UserContext"
import "./createpost.css"
import React, { useContext, useState } from 'react'
import {BiVideo} from "react-icons/bi"
import {BsFillFileImageFill, BsEmojiSmile, } from "react-icons/bs"


const CreatePost = (data:{showCreatePost:boolean , setShowCreatePost: Function}) => {

    const {showCreatePost, setShowCreatePost} = data

    const context = useContext(UserContext)
    const {img} = context.state
    

  return (
    <div className="w-full">
        <div className="createPostContainer p-4 rounded-md bg-white w-full">
            <div className="top flex items-center gap-3 md:mb-3 border-b border-[#e4e6e9] pb-3">
                <div className="img w-[40px] h-[40px] rounded-full overflow-hidden">
                    <img src={img} alt="" className="w-full" />
                </div>
                <button onClick={()=> setShowCreatePost(true)} className="bg-[#e4e6e9] cursor-text rounded-full w-full text-left py-1 px-3 text-[#8b8c8c]"> What's on your mind </button>
                <button onClick={()=> setShowCreatePost(true)} className="item  md:hidden">
                    <BsFillFileImageFill className='cIcon text-xl'/>                    
                </button>
            </div>
            <div className="bottom hidden  md:flex justify-between">
                <button onClick={()=> setShowCreatePost(true)} className="item w-[30%] py-2 text-center hover:bg-[#e4e6e9] rounded-md flex items-center justify-center gap-1 text-sm ">
                    <BiVideo className='cIcon text-xl'/>
                    <span> Live video</span>
                </button>
                <button onClick={()=> setShowCreatePost(true)} className="item w-[30%] py-2 text-center hover:bg-[#e4e6e9] rounded-md flex items-center justify-center gap-1 text-sm ">
                    <BsFillFileImageFill className='cIcon text-xl'/>
                    <span> Photo/video</span>
                </button>
                <button onClick={()=> setShowCreatePost(true)} className="item w-[30%] py-2 text-center hover:bg-[#e4e6e9] rounded-md flex items-center justify-center gap-1 text-sm ">
                    <BsEmojiSmile className='cIcon text-xl'/>
                    <span> Feelings/activity</span>
                </button>
            </div>
        </div>

        

    </div>
  )
}

export default CreatePost