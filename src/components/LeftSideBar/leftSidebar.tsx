"use client"
import React from 'react'
import {AiFillShop} from "react-icons/ai"
import {FaUserFriends} from "react-icons/fa"
import {BiSolidMemoryCard} from "react-icons/bi"
import {PiTelevisionSimpleFill} from "react-icons/pi"
import {MdOutlineFeed} from "react-icons/md"
import Link from 'next/link'

const LeftSideBar = (data: {img: string, _id:string, usrNm:string }) => {
       
    const {img, _id, usrNm} = data
  return (
    <section className='leftSidebarContainer hidden md:block w-[25%] my-6'>
        <ul>
          <li className=" my-4 hover:bg-gray-300 px-4 rounded-sm py-2 cursor-pointer">
            <Link href={`/profile/${_id}`} className='flex items-center gap-3'>
              <div className="img w-[40px] h-[40px] rounded-full overflow-hidden">
                <img src={img} alt="" className="w-full" />
              </div>
            <span>  {usrNm} </span>
            </Link>
          </li>
          <li className="flex items-center gap-3 my-4 hover:bg-gray-300 px-4 rounded-sm py-2 cursor-pointer">
            <FaUserFriends className="icon text-4xl text-deepOrange" />
            <span>  Friends </span>
          </li>
          <li className="flex items-center gap-3 my-4 hover:bg-gray-300 px-4 rounded-sm py-2 cursor-pointer">
            <BiSolidMemoryCard className="icon text-4xl text-deepOrange" />
            <span>  Memories </span>
          </li>
          <li className="flex items-center gap-3 my-4 hover:bg-gray-300 px-4 rounded-sm py-2 cursor-pointer">
            <PiTelevisionSimpleFill className="icon text-4xl text-deepOrange" />
            <span>  Watch </span>
          </li>
          <li className="flex items-center gap-3 my-4 hover:bg-gray-300 px-4 rounded-sm py-2 cursor-pointer">
            <AiFillShop className="icon text-4xl text-deepOrange" />
            <span>  Marketplace </span>
          </li>
          <li className="flex items-center gap-3 my-4 hover:bg-gray-300 px-4 rounded-sm py-2 cursor-pointer">
            <MdOutlineFeed className="icon text-4xl text-deepOrange" />
            <span>  Feed </span>
          </li>        
        </ul>
    </section>
  )
}

export default LeftSideBar