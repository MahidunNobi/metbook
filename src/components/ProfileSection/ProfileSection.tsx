import React from 'react'
import {BsFillPencilFill} from "react-icons/bs"
import {FaAngleDown } from "react-icons/fa"

const ProfileSection = (data:{img:string, username:string}) => {
  const {img, username} = data  
  return (
    <div className="profileSection px-3 -mt-[100px] lg:pl-[50px] flex flex-col lg:flex-row lg:items-end border-b border-gray-300 pb-5">
        <div className="img w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] overflow-hidden rounded-full border-2 border-gray-100">
          <img 
          className=''
          src={img}
          alt="" />
        </div>
        <div className="profileInfo w-full flex flex-col lg:flex-row lg:justify-between mb-[25px]">
          <div className="name lg:ml-2">
            <h2 className=' text-2xl font-semibold'> {username}</h2>
            <span  className=' text-gray-500'> 114 friends</span>
          </div>
          <div className="actionBtns">
            <button className='px-3  py-2 bg-blue-600 text-white rounded-lg text-sm lg:text-base'> + Add to your story </button>
            <button className='px-3 py-2 bg-gray-300 rounded-lg mx-4 text-sm lg:text-base'>           
            <BsFillPencilFill className='inline' /> 
            <span> Edit profile  </span>
            </button>
            <button className='px-3 py-2 bg-gray-300 rounded-lg text-sm lg:text-base'> <FaAngleDown /> </button>
          </div>
        </div>
        </div>
  )
}

export default ProfileSection