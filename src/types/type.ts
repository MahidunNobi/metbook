import { type } from "os"

export type likeType={
    likes:number,
    liked:boolean
  }
export type userType={
    img:string,
    username: string,
    city: string,
    country:string,
    email: string,
    posts: postType[],
    _id: string,
    mobile: number
  }
export type commentType={
    _id: string,
    user: userType,
    likers: string[],
    comment: string
  }
export type allCommentsType={
    number:number,
    comments: commentType[]
    }

export type authorType={
    _id: string
    img: string, 
    username: string,
    email: string,
    country: string,
    city: string
}
export type JwtPayload={
  username: string,
  _id: string,
  email: string
}
export type postType ={
  _id: string,
  author: authorType,
  caption: string,  
  comments: commentType[],
  images: string[],
  likers: string[],
  createdAt: Date,
  updatedAt: Date
}

export type dbPostType = {
  _id: string,
  author: string,
  caption: string,  
  comments: string[],
  images: string[],
  likers: string[],
  createdAt: Date,
  updatedAt: Date,
  save: Function
}