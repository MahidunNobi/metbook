"use client"
import "./createpost.css"
import React, { useState, useContext } from 'react'
import {AiOutlineClose, AiOutlineGif} from "react-icons/ai"
import {BsFillFileImageFill, BsEmojiSmile, } from "react-icons/bs"
import {FaUserFriends} from "react-icons/fa"
import axios from "axios"
import { UserContext } from "@/context/UserContext"


const CreatePostPopup = (data:{showCreatePost:boolean , setShowCreatePost: Function}) => {

    const {showCreatePost, setShowCreatePost} = data

    const context = useContext(UserContext)
    const {img:image} = context.state

    const [error, setError] = useState({err:false, message: ""})
    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState<File[]>([])
    const [credetials, setCredentials] = useState({
        caption: ""
    })   
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files
        if(file){
        let x=0
        let Images = []
        while (x < file.length) {
            
            if(file[x].size >= 500000){
                alert(`The ${file[x].name} file size is more than 500KB. Please upload image with less than 500KB size.`)
            }else{
                Images.push(file[x])                         
            }
            x++
        }
        setImg([...img, ...Images])
        // setImg(file)
        }
        
    }

    const handlePost = async()=>{
        setError({err: false, message:""})
        setLoading(true)
        try {
            if(credetials.caption === ""){
               return setError({err: true, message:"Caption is required"})
            }else{

                const imgURLS = await Promise.all(img.map(async(image, i)=> {
                    const formData = new FormData()
                    formData.append("file", image)
                    formData.append("upload_preset", "MetBook-Post")
                    const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/mahidunnobi/image/upload", formData)
                    const {url} = uploadRes.data
                    return url
                }))
                const newUserData = {
                    ...credetials,
                    images: imgURLS
                }
                const response = await axios.post("/api/post", newUserData)
                console.log(response.data);
                
                setShowCreatePost(false)
                setImg([])
        }

        } catch (error:any) {
            console.log(error.response.data.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <>    
        {showCreatePost && <div className="createPostPop bg-[#2d2c2c59] z-10 fixed top-0 left-0 h-full w-screen flex justify-center items-center">
            
            <div className="popConatiner max-h-[500px] no-scrollbar overflow-y-scroll  w-[300px] bg-white rounded-lg md:w-[400px] relative">
                <div className=" sticky top-0 title bg-white p-3 border-b border-deepOrange mb-3 z-10">
                    <h4 className="text-lg font-semibold text-center"> Create Post</h4>
                    <button 
                    onClick={()=> setShowCreatePost(false)} 
                    className="font-2xl p-2 rounded-full bg-[#bbb] text-gray absolute top-3 right-3"> 
                        <AiOutlineClose /> 
                    </button>
                </div>
                <div className="inputContainer p-4">
                    <div className="profile flex gap-[8px] items-center">
                        <div className="img h-[40px] w-[40px] rounded-full overflow-hidden">
                            <img src={image} alt="" />
                        </div>
                        <span className="text-base font-semibold"> Mahidun Nobi</span>
                    </div>
                    <div className="input my-3">
                        <textarea 
                        name="caption" 
                        id="caption" 
                        className="w-full outline-none"
                        rows={4}
                        placeholder="What's on your mind, Mahidun?"
                        value={credetials.caption}
                        onChange={(e)=>{
                            setCredentials({...credetials, caption: e.target.value})
                        }}
                        >

                        </textarea>
                    </div>

                    <div className="postImages ">
                        {img.length > 0 &&
                        img.map((im, i) =>  {
                            return (
                                <div className="div relative ">
                                <img key={i} className="w-full" src={
                                    URL.createObjectURL(im)
                                } alt="" />
                                <button 
                                onClick={()=> setImg(img.filter(image => image.name !== im.name))} 
                                className="font-2xl p-2 rounded-full bg-[#bbb] text-gray absolute top-3 right-3"> 
                                    <AiOutlineClose /> 
                                </button>
                                </div>
                            )})
                        }
                    </div>
                    {/* {img && <img src={URL.createObjectURL(img)} />} */}
                    
                    <div className=" sticky bottom-0 py-2 bg-white">
                        <div className="inputAssets border border-deepOrange rounded-lg p-3 flex justify-center md:justify-between items-center">
                            <span className="text-[#333] text-sm font-semibold hidden md:block "> 
                                Add to your post
                            </span>
                            <div className="inputs flex items-center gap-3">
                                <input type="file" id="image" 
                                name="image" className="hidden" multiple
                                onChange={(e) => handleFileChange(e)}
                                />
                                <label htmlFor="image" className="cursor-pointer"> 
                                    <BsFillFileImageFill className="text-2xl" /> 
                                </label>
                                <button> 
                                    <BsEmojiSmile className="text-2xl" /> 
                                </button>
                                <button> 
                                    <FaUserFriends className="text-2xl" /> 
                                </button>
                                <button> 
                                    <AiOutlineGif className="text-2xl" /> 
                                </button>
                            </div>
                        </div>
                        {error.err && <p className="text-red-600 font-semibold text-center"> {error.message} </p>}
                        <button 
                        disabled={loading}
                        onClick={handlePost} 
                        className="w-full py-1 border border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600 duration-100 rounded-md mt-3"> 
                        {loading ? "Posting" : "Post"}
                        </button>
                    </div>
                </div>
            </div>
            
        </div>}
    </>
  )
}

export default CreatePostPopup