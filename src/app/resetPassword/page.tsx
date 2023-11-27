"use client"
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

const Page = () => {
  const [credentials, setCredentials] = useState({
    newPassword: "",
    confirmPassword: "",
    token: ""
})
const [loading, setLoading] = useState(false)
const [err, setErr] = useState({
    status: false,
    message: ""
})
const [resetCompleted, setResetCompleted] = useState(false)
// Setting the token the credentials

const params = useSearchParams()
const token = params.get("token")

useEffect(()=>{
  if(!token){
    return
  }
    setCredentials({
    ...credentials,
    token
  })

}, [])

const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
  setCredentials( prev => {
      return {
          ...prev,
          [e.target.name]: e.target.value
      }
  })
}

const resetPassword = async() =>{
  try {
    setLoading(true)
    const response = await axios.post("/api/auth/resetPassword", credentials)
    setResetCompleted(true)
    console.log("Password reset completed")
    
  } catch (error:any) {
    setErr({status: true, message:error.response.data.message})
  }finally{
    setLoading(false)
  }
}

const handleReset = (e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault()
        if(credentials.newPassword===""|| credentials.confirmPassword===""){
            setErr({status: true, message:"All the fields are requred."})
        }else if(credentials.newPassword !== credentials.confirmPassword){
          setErr({status: true, message:"New Password and Confrim Password are must be same!"})
        }
        else{
            setErr({status: false, message:""})     
            resetPassword()
        }

}
  return (
    <div>
    <div className="container mx-auto flex justify-center min-h-screen items-center  ">
        {resetCompleted ? 
        <>
        <h1 className='text-2xl md:text-5xl text-deepOrange'> Password reset completed
        </h1> 
        <Link href="/login" className="text-blue-500 underline"> Login </Link>
        </>
        : 
        <form className='formContainer flex flex-col space-y-3 items-center border-2 border-[#ff6e40] bg-[#f5f0e1] rounded-lg p-6 md:w-[400px] w-[300px]'>
            <h2 className="text-2xl mb-6"> Reset Password </h2>           
            <input 
            type="password"
            placeholder='New Password'
            name="newPassword"
            id="newPassword"
            className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
            onChange={handleChange}
            />                
            <input 
            type="password"
            placeholder='Confrim Password'
            name="confirmPassword"
            id="confirmPassword"
            className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
            onChange={handleChange}
            />                
            { err.status && <p className="text-red-700 font-bold text-center">
                {err.message}
            </p>}       
            <button disabled={loading} onClick={handleReset} className='bg-[#ff6e40] py-3 w-full text-white md:text-lg active:bg-[#a44d33] duration-300'> 
                {loading ? "Processing..." : "Reset"}
            </button>
            <p>Know your password? <Link className='text-blue-600 underline' href="/login">Login here </Link> </p>
        </form>
        }
    </div>
</div>
  )
}

export default Page