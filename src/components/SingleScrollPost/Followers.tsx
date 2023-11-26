import React from 'react'
import { likeType, allCommentsType } from '@/types/type'

const Followers = (data: {like:likeType, allComments: allCommentsType}) => {
  const {like, allComments} = data

  return (
    <div className="followersInte flex justify-between text-xs text-gray-500 pt-3">
          <span> {like.likes} likes</span>
          <span> {allComments.number} comments</span>
    </div>
  )
}

export default Followers