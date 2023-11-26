"use client"
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import {AiFillHome, AiOutlineUsergroupAdd, AiFillShop, AiFillMessage, AiOutlineClose, AiOutlineMenu} from "react-icons/ai"
import {PiTelevisionBold} from "react-icons/pi"
import {IoMdNotifications} from "react-icons/io"
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import "./navbar.css"
import axios from 'axios'
import { UserContext } from '@/context/UserContext'

const Navbar = (data: {img: string, _id:string}) => {
  const path = usePathname()
  const [showUserOption, setShowUserOption] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)  
  const router =useRouter()

  const {img, _id} = data
  
  const handleLogout=async()=>{    
    setShowUserOption(false)
       try {
        const res = await axios.post("/api/auth/logout")
        router.push("/login")
       } catch (error:any) {
        console.log(error.message);
       }
  }
  
  
  return (
    <nav className="nav sticky top-0 bg-white z-50">
      <div className="container navContainer mx-auto flex justify-between">
        <div className="logo text-6xl">
          <h1 className=''>METBOOK</h1>
        </div>
        <div className="navigators hidden md:flex">
          <Link href={"/feed"} className={path === "/feed" ? "active" : ""}>       
            <AiFillHome className='text-2xl'/>             
          </Link>
          <Link href="/groups" className={path === "/groups" ? "active" : ""}>     
            <AiOutlineUsergroupAdd className='text-2xl' /> 
          </Link>
          <Link href="/watch" className={path === "/watch" ? "active" : ""}>     
           <PiTelevisionBold className='text-2xl'/>      
          </Link>
          <Link href="/marketplace" className={path === "/marketplace" ? "active" : ""}> 
            <AiFillShop className='text-2xl' />            
          </Link>
        </div>
        <div className="profile hidden md:flex">
          <button> <AiFillMessage className='text-2xl' />  </button>
          <button className='notificationBar'> <IoMdNotifications className='icon text-2xl' /> <span> 10</span>  </button>
          <div className="profileSec">
          <button className='profileBtn' onClick={()=> setShowUserOption(!showUserOption)}> 
           <img src={img} alt="" />          
          </button>
          {showUserOption && <div className="profileOptions">
              <Link className='hover:text-gray-600' href={`/profile/${_id}`}> Profile</Link>
              <button className='hover:text-gray-600' onClick={handleLogout}> Logout</button>
          </div>}
          </div>
        </div>
        <div className="mobileMenuBtn md:hidden">
          <button onClick={()=> setShowMobileMenu(true)}> <AiOutlineMenu className='text-3xl' /> </button>
        </div>

      </div>
      <div className={`mobileMenu  ${showMobileMenu ? "active" : ""}`}>
        <div className="exitBtn">
            <button onClick={()=> setShowMobileMenu(false)}> <AiOutlineClose /> </button>
        </div>
        <div className={`mobilenavigation`}>

        <Link href={`/profile/${_id}`} className="flex items-center gap-3 my-2 hover:bg-gray-300 cursor-pointer">
            <div className="img w-[40px] h-[40px] rounded-full overflow-hidden">
              <img src={img} alt="" className="" />
            </div>
           <span>  Mahidun Nobi </span>
        </Link>

          <Link href={"/feed"} className={path === "/feed" ? "active" : ""}>       
            <AiFillHome className='icon'/> Home            
          </Link>
          <Link href="groups" className={path === "/groups" ? "active" : ""}>     
            <AiOutlineUsergroupAdd className='icon' /> Group
          </Link>
          <Link href="watch" className={path === "/watch" ? "active" : ""}>     
           <PiTelevisionBold className='icon'/> Watch     
          </Link>
          <Link href="marketplace" className={path === "/marketplace" ? "active" : ""}> 
            <AiFillShop className='icon' /> Marketplace      
          </Link>          
        </div>
      </div>
    </nav>
  )
}

export default Navbar