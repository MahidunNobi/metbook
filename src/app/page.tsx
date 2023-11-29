import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='text center w-full min-h-screen flex flex-col justify-center items-center text-xl p-3'>
      <h1 className='text-3xl md:text-6xl font font-semibold'> Hi There! 😃</h1>
      <p className=''> 
        This is a social media app. Main purpose of this website is to showcase the skills and ablity of <b> MD. Mahidun Nobi </b> 
      </p>
      <div className='w-[300px] p-3 border-2 border-red-500 rounded-md'>
        <h3 className='text-xl md:text-4xl font font-semibold'> Demo User:</h3>
        <p><b>username:</b> Two</p>
        <p><b>password:</b> 321654</p>
      </div>

      <div className='w-[300px] p-3 border-2 border-green-500 rounded-md my-5'>
        <h3 className='text-xl font font-semibold mb-5'> Start your journey:</h3>
        <Link href="/login" className='bg-green-200 py-2 px-4 rounded-lg border-2 border-green-800 mx-2'> Login </Link>
        <Link href="/signup" className='bg-green-200 py-2 px-4 rounded-lg border-2 border-green-800 mx-2'> Sign Up </Link>
      </div>

      <h3 className="text-xl text-gray-700"> Github: https://github.com/MahidunNobi/metbook </h3>

      <ul className=' list-item'>
        <h2 className='text-2xl md:text-4xl font font-semibold'> Features:</h2>
        <li>- Authentication system - (Login & Signup) </li>
        <li>- Email varification system after signup</li>
        <li>- Forget Password functionality.</li>
        <li>- Protected routes for loged in users.</li>
        <li>- Post creating functionality</li>
        <li>- Like and comment functionality</li>
        <li>- Profile page with posts the user posted.</li>
      </ul>

      <ul className=' list-item'>
        <h2 className='text-2xl md:text-4xl font font-semibold'> Technologies:</h2>
        <li>- Next JS 14 </li>
        <li>- Typescript 5</li>
        <li>- React JS 18</li>
        <li>- Tailwindcss 3.3</li>
        <li>- Mongoose 8</li> 
      </ul>

    </main>
  )
}
