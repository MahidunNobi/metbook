"use client"
import CreatePost from "@/components/CreatePost/CreatePost"
import CreatePostPopup from "@/components/CreatePost/CreatePostPopup"
import SingleScrollPost from "@/components/SingleScrollPost/SingleScrollPost"
import { postType } from "@/types/type"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Page(){

    const [showCreatePost, setShowCreatePost] = useState<boolean>(false)
    const [allPosts, setAllPosts] = useState<postType[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(()=>{
   
        async function getPosts(){
         setLoading(true)
         try {
           const res = await axios.get("./api/post")   
           console.log(res.data);              
           setAllPosts(res.data.posts)
         } catch (error:any) {
           console.log(error.message);
         }finally{
           setLoading(false)
         }
        }
       getPosts()
     }, []) 

    return (
        <div className="feedContainer md:my-6 my-0 mx-auto md:w-[45%]">
            <CreatePost showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} />

            {loading ? <h3> Loading...</h3> : allPosts.map(post => <SingleScrollPost key={post._id} {...post} />)}

            <CreatePostPopup showCreatePost={showCreatePost} setShowCreatePost={setShowCreatePost} />
        </div>
    )
}