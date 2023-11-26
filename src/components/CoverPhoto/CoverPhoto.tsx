import React from 'react'

const CoverPhoto = () => {
  return (
    <div className="coverPhoto h-[200px] lg:h-[400px] w-full flex items-center overflow-hidden rounded-b">
          <img 
          src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D" alt="" 
          className='w-full' />
    </div>
  )
}

export default CoverPhoto