import React from 'react'
import {BsFillHandThumbsUpFill} from "react-icons/bs"
import {FaRegCommentDots} from "react-icons/fa"
import axios from 'axios'
import { likeType } from '@/types/type'

// type likeType={
//   likes:number,
//   liked:boolean
// }

const ActionButtons = (data :{_id:string, like: likeType, setLike: Function}) => {
    const {_id, like, setLike} = data
    const HandleLike = async(id:string)=>{
        try {
          const res = await axios.post("/api/post/like", {_id: id})
          like.liked ? setLike({...like,liked: false, likes: like.likes-1}) : setLike({...like, liked: true, likes: like.likes+1})
          
        } catch (error:any) {
          console.log(error.message);
        }
      }
  return (
    <div className="bottom flex justify-between mt-2">
                <button onClick={()=> HandleLike(_id)} style={{color: like.liked ? "#3a3aff" : ""}} className=" item w-[49%] py-2 text-center hover:bg-[#e4e6e9] rounded-md flex items-center justify-center gap-1 text-sm">                    
                <BsFillHandThumbsUpFill className='text-lg' />
                    <span>Like</span>
                </button>
                <button className="item w-[49%] py-2 text-center hover:bg-[#e4e6e9] rounded-md flex items-center justify-center gap-1 text-sm">                   
                    <FaRegCommentDots className='text-lg' />
                    <span> Comment</span>
                </button>                
    </div>
  )
}

export default ActionButtons