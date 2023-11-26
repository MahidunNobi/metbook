import React, { useState } from 'react'
import {FiMoreHorizontal} from "react-icons/fi"


const ProfileNav = () => {
    const [nav, setNav] = useState("post")
    // console.log(id);
    const style = (prop:string)=>{
      return nav === prop ? {borderBottom: "2px solid #0866ff", color: "#0866ff"} : {}
    }
  return (
    <div className="navbar hidden lg:flex justify-between items-center pr-3">
          <ul className='flex text-gray-600'>
            <li className='px-6 py-3 mt-3 ' style={style("post")} > <button onClick={()=> setNav("post")}> Post </button></li>
            <li className='px-6 py-3 mt-3 ' style={style("about")} > <button onClick={()=> setNav("about")}>  About </button></li>
            <li className='px-6 py-3 mt-3 ' style={style("friends")} > <button onClick={()=> setNav("friends")}>  Friends </button></li>
            <li className='px-6 py-3 mt-3 ' style={style("photos")} > <button onClick={()=> setNav("photos")}> Photos </button></li>
            <li className='px-6 py-3 mt-3 ' style={style("videos")} > <button onClick={()=> setNav("videos")}>  Videos </button></li>
            <li className='px-6 py-3 mt-3 ' style={style("check in")} > <button onClick={()=> setNav("check in")}> Check In </button></li>
            <li className='px-6 py-3 mt-3 ' style={style("more")} > <button onClick={()=> setNav("more")}>  More </button></li>
          </ul>
          <div>
            <button className='px-3 py-2 bg-gray-300 rounded-md'>
              <FiMoreHorizontal />
            </button>
          </div>
        </div>
  )
}

export default ProfileNav