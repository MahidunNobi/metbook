import React from 'react'
import { format } from 'date-fns'
import {FiMoreHorizontal} from "react-icons/fi"
import Link from 'next/link'
import { authorType } from '@/types/type'

const Profile = (data:{author:authorType, updatedAt:Date, _id:string}) => {
  const {author, updatedAt, _id}=data
  const date = new Date(updatedAt)
  const upd = format(date, "dd MM yyyy") 
  return (
    <div className="top flex items-center gap-3 md:mb-3 relative">
                <div className="img w-[40px] h-[40px] rounded-full overflow-hidden">
                    <img src={author.img} alt="" className="w-full" />
                </div>
                <Link href={`/profile/${_id}`} className="profileDesc flex flex-col ">
                  <h4 className='text-sm font-semibold m-0'> {author.username}</h4>
                  <span className='text-xs text-[#333]'> {upd} at {`${date.getHours()}:${date.getMinutes()}`}</span>
                </Link>

                <button className=" absolute top-[20px]  right-[20px]">                                  
                  <FiMoreHorizontal />
                </button>
    </div>
  )
}

export default Profile