"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import axios from 'axios'


const ForgetPassword = () => {

  const [credentials, setCredentials] = useState({
    username: ""
})
const [loading, setLoading] = useState(false)
const [err, setErr] = useState({
    status: false,
    message: ""
})
const [mailSent, setMailSent] = useState(false)

const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
  setCredentials( prev => {
      return {
          ...prev,
          [e.target.name]: e.target.value
      }
  })
}

const sendForgetPasswordmail = async() =>{
  try {
    setLoading(true)
    const response = await axios.post("/api/auth/forgetPasswordMailer", credentials)
    setMailSent(true)
    console.log("Mail Sent")
    
  } catch (error:any) {
    setErr({status: true, message:error.response.data.message})
  }finally{
    setLoading(false)
  }
}

const handleCheck = (e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault()
        if(credentials.username===""){
            setErr({status: true, message:"Username is requred."})
        }else{
            setErr({status: false, message:""})
            sendForgetPasswordmail()
        }

}
  return (
    <div>
    <div className="container mx-auto flex justify-center min-h-screen items-center  ">
        {mailSent ? 
        <h1 className='text-2xl md:text-5xl text-deepOrange'> Please check your E-mail to reset password</h1> 
        : 
        <form className='formContainer flex flex-col space-y-3 items-center border-2 border-[#ff6e40] bg-[#f5f0e1] rounded-lg p-6 md:w-[400px] w-[300px]'>
            <h2 className="text-2xl mb-6"> Password recovery</h2>
            <input 
            type="text"
            placeholder='Username'
            name="username"
            id="username"
            className='bg-transparent px-4 py-2 mb-3 border-2 border-[#ff6e40] w-full rounded-lg'
            onChange={handleChange}
            />                
            { err.status && <p className="text-red-700 font-bold">
                {err.message}
            </p>}       
            <button disabled={loading} onClick={handleCheck} className='bg-[#ff6e40] py-3 w-full text-white md:text-lg active:bg-[#a44d33] duration-300'> 
                {loading ? "Processing..." : "Find your profile"}
            </button>
            <p>Know your password? <Link className='text-blue-600 underline' href="/login">Login here </Link> </p>
        </form>
        }
    </div>
</div>
  )
}

export default ForgetPassword