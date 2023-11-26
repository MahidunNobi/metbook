"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import CoverPhoto from '@/components/CoverPhoto/CoverPhoto'
import ProfileSection from '@/components/ProfileSection/ProfileSection'
import ProfileNav from '@/components/ProfileNav/ProfileNav'
import ProfileIntro from '@/components/ProfileIntro/ProfileIntro'
import ProfilePhotos from '@/components/ProfilePhotos/ProfilePhotos'
import CreatePostPopup from '@/components/CreatePost/CreatePostPopup'
import CreatePost from '@/components/CreatePost/CreatePost'
import axios from 'axios'
import SingleScrollPost from '@/components/SingleScrollPost/SingleScrollPost'
import { userType } from '@/types/type'

const Page = () => {
    const {id} = useParams()
    
    const [showCreatePost, setShowCreatePost] = useState<boolean>(false)
    const [user, setUser] = useState<userType|null>(null)
    const [loading, setLoading] = useState<boolean>(false)    
console.log(user);

    const getPosts = async()=>{
      try {
        setLoading(true)
        const res = await axios.post("/api/user", {id:id})
        setUser(res.data.user)               
      } catch (error:any) {
        console.log(error.message)
      }
      finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      getPosts()
    }, [showCreatePost])
   
  return (
    <>    
    {user ? 
    <main className='w-full'>
      
      <header className='bg-white'>
        <div className="container mx-auto">
        <CoverPhoto  />
        <ProfileSection img={user.img} username={user.username} />        
        <ProfileNav />
        </div>
      </header>
      <div className="downSection bg-gray-200 py-10">      
        <div className="postsSection container mx-auto flex flex-col lg:flex-row gap-3">
          <div className="left lg:w-[40%] px-3">
            <ProfileIntro />
            <ProfilePhotos />
          </div>          
          <div className="right lg:w-[60%] px-3">
          <CreatePost showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} />
          {user && user.posts.length > 0 ? 
          user.posts.map(post => <SingleScrollPost key={post._id} {...post} />)
          :
          <h2> You poststed nothing yet... </h2>}
          </div>
        </div>
      </div>
      <CreatePostPopup showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} />
      </main>
      :
      
      <h1 className='text-2xl'> Loading...</h1>      
    }
      </>
  )
}

export default Page