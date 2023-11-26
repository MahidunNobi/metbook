"use client"
import axios from 'axios'
import React, { useState } from 'react'
import {AiOutlineSend} from "react-icons/ai"
import {BsThreeDots} from "react-icons/bs"
import { allCommentsType } from '@/types/type'


const Comments = (data:{allComments: allCommentsType, setAllComments:Function, _id:string}) => {
  const {allComments, setAllComments, _id} = data

  const [newComment, setNewComment] = useState("")
  const [loadingComment, setLoadingComment] = useState(false)
  
  const handlePostComment= async()=>{
    setLoadingComment(true)
    try {
      const res = await axios.post("/api/post/comment", {postId: _id, comment: newComment})
      setAllComments({...allComments, number: allComments.number+1, comments: [...allComments.comments, res.data.data]})
      // console.log(res.data);
    } catch (error:any) {
      console.log(error.message);
    }finally{
      setLoadingComment(false)
      setNewComment("")
    }
  }

  return (
    <div>
      <div className="input my-3 bg-[#e6e6e6] flex justify-between px-3 py-1 rounded-full">
        <input type="text" 
        onChange={(e)=> setNewComment(e.target.value)}
        value={newComment}
        className='  bg-transparent w-full z-10 outline-none'
        placeholder='Write comment...' name='comments' />
        <button onClick={handlePostComment} disabled={loadingComment}>
          <AiOutlineSend className='text-xl' />
        </button>
      </div>
      <div className="comments">

        {allComments.comments.length>0 && allComments.comments.map(cmnt => <div key={cmnt._id} className="comment flex gap-2 items-start">
        <div className="">
            <img src={`${cmnt.user.img}`} alt="" className="w-[28px] h-[28px] rounded-full overflow-hidden" />
        </div>
        <div>
        <div className="post px-3 py-1 bg-[#e1e1e1] rounded-xl flex flex-col gap-0">
          <span className='text-xs font-semibold '>{cmnt.user.username}</span> 
          <span className='text-sm '> {cmnt.comment} </span>
        </div>
        <div className="actions flex gap-3 px-3 ">
          <button className='text-xs text-[#333] hover:underline'>Like</button>
          <button className='text-xs text-[#333] hover:underline'>Reply</button>
          <button className='text-xs text-[#333] hover:underline'>Share</button>
        </div>
        </div>

        <button className='hover:bg-[#e1e1e185] rounded-full p-1'> <BsThreeDots /> </button>
        </div> )}
      </div>     
      </div> 
  )
}

export default Comments