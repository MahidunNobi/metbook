"use client"
import React, { useState, useContext } from 'react'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/context/UserContext'

function Page(){

    //-------- Types ----
    type credentialsType ={
        username: string,
        password: string
    }
    type errorStateType = {
        status: boolean,
        message: string
    }

    const context = useContext(UserContext)

    const router= useRouter()
    const [credentials, setCredentials] = useState<credentialsType>({
        username: "",
        password: ""        
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [err, setErr] = useState<errorStateType>({
        status: false,
        message: ""
    })   
    const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{        
        setCredentials( prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    
     const userLogin = async()=>{     
        try {
            setLoading(true)
            const response = await axios.post("/api/auth/login", credentials)            
            router.push("/feed")       
        } catch (error:any) {            
            setErr({status:true, message: error.response.data.message})
            console.log(error);
        }finally{
            setLoading(false)            
        }
    }


    const handleLogin= (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(credentials.username===""|| credentials.password=== ""){
            setErr({status: true, message:"All the fields are required."})
        }else{
            setErr({status: false, message:""})
            userLogin()
        }

    }
    
return (
    <div>
    <div className="container mx-auto flex justify-center min-h-screen items-center  ">
        <form className='formContainer flex flex-col space-y-3 items-center border-2 border-[#ff6e40] bg-[#f5f0e1] rounded-lg p-6 md:w-[400px] w-[300px]'>
            <h2 className="text-2xl mb-6"> Login</h2>
            <input 
            type="text"
            placeholder='Username'
            name="username"
            id="username"
            value={credentials.username}
            className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
            onChange={handleChange}
            />                
            <input 
            type="password"
            placeholder='Password'
            name="password"
            id="password"
            value={credentials.password}
            className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
            onChange={handleChange}
            /> 
            <Link href="/forgetpassword" className='text-blue-500 underline hover:text-blue-600'> Forgot Password? </Link>        
            { err.status && <p className="text-red-700 font-bold">
                {err.message}
            </p>}       
            <button disabled={loading} onClick={handleLogin} className='bg-[#ff6e40] py-3 w-full text-white md:text-lg active:bg-[#a44d33] duration-300'> 
                {loading ? "Processing..." : "Login"}
            </button>
            <p>Don't have an account? <Link className='text-blue-600 underline' href="/signup">Signup here </Link> </p>
        </form>
    </div>
</div>
)
}

export default Page