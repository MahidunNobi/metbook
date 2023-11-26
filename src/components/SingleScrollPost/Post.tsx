import React from 'react'

const Post = (data:{images:string[], caption:string}) => {
  const {images, caption} = data
    const ImgFormat = function (){
        if(images.length === 1){
          
          return (
            <div className="postimages">
              <img src={images[0]} alt=""/>
            </div>
          )
        }else if(images.length === 2){
          
    
          return (
            <div className="postimages flex justify-between">
              <img src={images[0]} alt="" className='w-[49.5%] object-cover'/> 
                <img src={images[1]} alt="" className=' w-[49.5%] object-cover' />
            </div>
          )
    
        }else if(images.length === 3){
          return (
            <div className="postimages">
              <div className="firstRowImg flex justify-between max-h-[300px] overflow-hidden">
                <img src={images[0]} alt="" className='w-[49.5%] object-cover'/> 
                <img src={images[1]} alt="" className=' w-[49.5%] object-cover' />
              </div>         
              <img src={images[2]} alt="" className=' w-full object-cover my-1' />          
            </div>
          )
    
        }else if(images.length === 4){
          return (
            <div className="postimages">
              <div className="firstRowImg flex justify-between max-h-[300px] overflow-hidden mb-1 ">
                <img src={images[0]} alt="" className='w-[49.5%] object-cover'/> 
                <img src={images[1]} alt="" className=' w-[49.5%] object-cover' />
              </div>         
              <div className="SecondRowImg flex justify-between max-h-[300px] overflow-hidden mb-1 ">
                <img src={images[2]} alt="" className='w-[49.5%] object-cover'/> 
                <img src={images[3]} alt="" className=' w-[49.5%] object-cover' />
              </div>         
                       
            </div>
          )
        }else if(images.length > 4){    
          return (
            <div className="postimages">
              <div className="firstRowImg flex justify-between max-h-[300px] overflow-hidden  mb-1">
                <img src={images[0]} alt="" className='w-[49.5%] object-cover'/> 
                <img src={images[1]} alt="" className=' w-[49.5%] object-cover' />
              </div>         
              <div className="SecondRowImg flex justify-between max-h-[300px] overflow-hidden mb-1">
                <img src={images[2]} alt="" className='w-[49.5%] object-cover'/>
                <div className="lastImg w-[49.5%] relative">
                  <img src={images[3]} alt="" className=' w-[100%] object-cover' />
                  <div className="moreImgNum absolute top-0 left-0 h-full w-full bg-[#333333b1] flex justify-center items-center">
                    <span className='text-white text-2xl md:text-4xl'> {images.length-4}+</span>
                  </div>
                </div>
              </div>         
                       
            </div>
          )
        }
      }  
  return (
    <div className="post">
              <p  className='mb-3'> {caption}</p>
              <div className="postImg">
                {/* <img src="" alt="" /> */}
                {images.length > 0 && <ImgFormat/>}
              </div>
    </div>
  )
}

export default Post