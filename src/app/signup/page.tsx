"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import {useRouter} from 'next/navigation'


const Page = () => {

    type credentialsType = {
        username:string,
        password: string,
        mobile: string,
        email: string,
        country:string,
        city: string
    }

    type errorStateType = {
        status: boolean,
        message: string
    }
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [err, setErr] = useState<errorStateType>({
        status: false,
        message: ""
    })
    const [img, setImg]    = useState<File>()   

    const [credentials, setCredentials] = useState<credentialsType>({
        username:"",
        password: "",
        mobile: "",
        email: "",
        country:"",
        city: ""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setCredentials( prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }


    const saveUser = async()=>{
        try {     
            setLoading(true)
            
            let newUser
            if(img){
                const formData = new FormData()
                formData.append("file", img)
                formData.append("upload_preset", "MetBook-Post")
                const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/mahidunnobi/image/upload", formData)
                const {url} = uploadRes.data
                newUser = {
                    ...credentials,
                    img: url
                }
            }  else{
                newUser = {
                    ...credentials,                    
                }
            }
            
            
            const res = await axios.post("/api/auth/signup", newUser)
            console.log(res.data)

        } catch (error:any) {
            setErr({status: true, message: error.response.data.message})
            console.log(error)
        }finally{
            setLoading(false)
            router.push("/login")
        }
    }

    
    const handleSignUp = async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()  
        if(credentials.username===""|| credentials.password=== ""|| credentials.mobile=== ""||   credentials.email=== "" || credentials.country==="" || credentials.city=== ""){
            setErr({status: true, message:"All the fields are requred."})
        }else{
            setErr({status: false, message:""})
            saveUser()
        }       
            
    }
    
  return (
    <div>
        <div className="container mx-auto flex justify-center min-h-screen items-center my-6 md:my-0">
            <form className='formContainer flex flex-col items-center border-2 border-[#ff6e40] bg-[#f5f0e1] rounded-lg p-6 md:w-[500px] w-[300px]'>
                <h2 className="text-2xl mb-6"> Sign Up</h2>
                <div className="img flex flex-col items-center space-y-2 mb-3">
                    <img 
                    className="w-[80px] rounded-full overflow-hidden border-2 border-[#ff6e40]"
                    src={
                        img?
                        URL.createObjectURL(img) 
                        :
                        "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    } 
                    alt="" 
                    />
                    <label className="border border-orange-500 rounded-md text-orange-500 hover:text-white hover:bg-orange-500 duration-300 cursor-pointer px-2 py-1" htmlFor="image">Select Image</label>

                    <input 
                    type="file" 
                    name="image" 
                    id="image"
                    className="hidden bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg"
                    onChange={(e)=> setImg(e.target.files?.[0])}
                    />
                </div>
                <input 
                type="text"
                placeholder='Username'
                name="username"
                id="username"
                className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
                onChange={handleChange}
                />
                <input 
                type="email"
                placeholder='E-mail'
                name="email"
                id="email"
                className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
                onChange={handleChange}
                />
                <input 
                type="text"
                placeholder='Country'
                name="country"
                id="country"
                className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
                onChange={handleChange}
                />
                <input 
                type="text"
                placeholder='City'
                name="city"
                id="city"
                className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
                onChange={handleChange}
                />
                <input 
                type="text"
                placeholder='Mobile'
                name="mobile"
                id="mobile"
                className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
                onChange={handleChange}
                />
                <input 
                type="password"
                placeholder='Password'
                name="password"
                id="password"
                className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
                onChange={handleChange}
                />
                { err.status && <p className="text-red-700 font-bold">
                    {err.message}
                </p>}
                <button disabled={loading} onClick={handleSignUp} className='bg-[#ff6e40] py-3 w-full text-white md:text-lg active:bg-[#a44d33] duration-300'> 
                    {loading ? "Processing..." : "Sign up"}
                </button>
                <p>Already have an account? <Link className='text-blue-600 underline' href="/login">Login here </Link> </p>
            </form>
        </div>
    </div>
  )
}

export default Page