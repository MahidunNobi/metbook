import React from 'react'
import {AiFillHome} from "react-icons/ai"
import {BiCurrentLocation} from "react-icons/bi"

const ProfileIntro = () => {
  return (
    <div className="intro bg-white rounded-lg p-6 mb-6">
              <h3 className='border-b border-gray-300 text-2xl font-semibold pb-2 mb-2'>Intro</h3>
              <p className='my-3 text-sm leading-4'> This is Bio. This is Bio.  This is Bio.  This is Bio. This is Bio.</p>
              <button className='bg-gray-300 w-full py-1 rounded-md font-semibold'> Edit Bio</button>
              <div className="location flex gap-2 items-center my-3">
                <AiFillHome className='text-2xl' />
                <span className='text-sm'> Lives in <b>Chowgacha, Khulna, Bangladesh</b> </span>
              </div>
              <div className="location flex gap-2 items-center my-3">
                <BiCurrentLocation  className='text-2xl'/>
                <span className='text-sm'> From <b>Chowgacha, Khulna, Bangladesh</b> </span>
              </div>
              <button className='bg-gray-300 w-full py-1 rounded-md font-semibold'>Edit Details</button>              
    </div>
  )
}

export default ProfileIntro