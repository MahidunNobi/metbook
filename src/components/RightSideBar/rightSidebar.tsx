"use client"
import React from 'react'

const Rightsidebar = () => {
  return (
    <section className='w-[25%] mt-[30px] hidden md:block'>
        <div className="sponsored text-gray-500">
            <h3> Sponsored</h3>
            <div className="item flex items-center gap-4 mt-3">
                <div className="img w-[150px] rounded-md overflow-hidden">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4DXQBRVV19a2S2WcecZskiN1fXzS1HH-yMqTQZsEUkevPP3jHd-96uLM0QUz1fY3kfb0&usqp=CAU" alt="" />
                </div>
                <div className="desc">
                    <h5 className='text-gray-800 font-semibold'> Friday Fashion </h5>
                    <span className='text-xs leading-3 block'> Buy cloths in 90% Off from our shop</span>
                </div>
            </div>
            <div className="item flex items-center gap-4 mt-3">
                <div className="img w-[150px] rounded-md overflow-hidden">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4DXQBRVV19a2S2WcecZskiN1fXzS1HH-yMqTQZsEUkevPP3jHd-96uLM0QUz1fY3kfb0&usqp=CAU" alt="" />
                </div>
                <div className="desc">
                    <h5 className='text-gray-800 font-semibold'> Friday Fashion </h5>
                    <span className='text-xs leading-3 block'> Buy cloths in 90% Off from our shop</span>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Rightsidebar