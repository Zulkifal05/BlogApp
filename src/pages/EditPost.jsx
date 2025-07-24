import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PostForm from '../components/PostForm';

const EditPost = () => {
  let { state } = useLocation();
  let [toEditPost,setToEditPost] = useState({});

  useEffect(() => {    
    if(state.post) {
      setToEditPost(state.post)
    }
  },[state.post])

  return (
    <>
      <h1 className='text-center p-3 text-3xl font-bold mt-5'>Edit Post</h1>
      <PostForm post={toEditPost}/>
    </>
  )
}

export default EditPost