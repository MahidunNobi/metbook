import React, { useEffect, useState, useContext } from 'react'
import Comments from './Comments'
import Profile from './Profile'
import Post from './Post'
import Followers from './Followers'
import ActionButtons from './ActionButtons'
import { authorType, commentType, postType } from '@/types/type'
import { UserContext } from '@/context/UserContext'

const SingleScrollPost:React.FC<postType> = ({author, caption, images, likers, comments, updatedAt, _id}) => {
  // author: authorType, caption:string, images:string[], likers:string[], comments:commentType[], updatedAt: Date, _id: string
  // const {author, caption, images, likers, comments, updatedAt, _id} = data
  const [like, setLike] = useState({
    likes: likers.length,
    liked: false
  })
  // const user = JSON.parse(localStorage.getItem("user")!)
  const context = useContext(UserContext)
  const username = context.state.username


  // Comment Section Start

  const [allComments, setAllComments] = useState({
    number: comments.length,
    comments: comments
  })
  // Comment Section End
  useEffect(()=>{
    likers.find(l => l=== username) && setLike({...like, liked:true})   
  }, [])

  return (
    <div className='my-2 bg-white pt-4 px-6 pb-1 rounded-md'>

        <Profile author={author} _id={_id} updatedAt={updatedAt} />
        <Post caption={caption} images={images} />        
        <Followers like={like}  allComments={allComments} />
        <ActionButtons _id={_id} like={like} setLike={setLike} />        
        <Comments allComments={allComments} setAllComments={setAllComments} _id={_id} />

    </div>
  )
}

export default SingleScrollPost