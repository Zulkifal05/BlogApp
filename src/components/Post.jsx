import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AuthService from '../services/Auth';
import PostsService from '../services/Posts';

const Post = ({post}) => {
  let [isAuthor,setIsAuthor] = useState(false);
  let [Username,setUsername] = useState("");

  // let logedInUserID = useSelector((state) => state.auth.userData?.$id)
  let logedInUserID = "6877aa90001cbf79495e";

  useEffect(() => {
    if(logedInUserID === post.UserID) {
      setIsAuthor(true);
    }
    else {
      setIsAuthor(false);
    }
  }, [post]);  

  return (
    <>
      <div className='max-w-[30%] min-w-[330px] bg-gray-500 h-140 p-3 rounded-2xl'>
          <img src={PostsService.FilePreview(post.FeaturedImage)} alt = "Post Image" className='h-50 w-[100%] rounded-2xl'/>
          <p className='font-bold text mt-3 text-gray-800'>By <span className='text-black'>{post.UserName}</span></p>
          <h1 className='font-bold text-3xl text-center text-black'>{post.Title}</h1>
          <p className='font-bold text-gray-800'>{post.Content}</p>
          <div className='flex justify-center items-center mt-3'>
            {isAuthor && <button className='bg-black py-2 px-5 text-xl text-white font-bold rounded-xl cursor-pointer hover:outline-2 hover:outline-black hover:bg-gray-500 hover:text-black'>Edit</button>}
          </div>
        </div>
    </>
  )
}

export default Post