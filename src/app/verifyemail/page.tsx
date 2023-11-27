"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

const page = () => {
  const [processing, setProscessing] = useState(false)
  const [err, setErr] = useState({status: false, message: ""})

  const params = useSearchParams()
  const token = params.get("token")

  const verifyToken = async() => {
    try {
      setProscessing(true)
      const response = await axios.post("/api/verifyEmail", {token})
      console.log("Verify Completed")      
    } catch (error:any) {
      setErr({
        status: true,
        message: error.response.data.message
      } )
      console.log(error);
    }
    finally{
      setProscessing(false)
    }
  }

  useEffect(()=>{
    verifyToken()
  }, [token])


  return (
    <div className='container mx-auto text-center'>
      {processing ? 
      <h1>Verifing email...</h1> : 
      err.status ? <h1 className='text-red-600'> Verify Failed </h1> : 
      <h1> Email Verified</h1> }

    </div>
  )
}

export default page