import React, { useId } from 'react'
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import PostsService from '../services/Posts'
import { useNavigate } from 'react-router-dom'

const PostForm = ({post}) => {
  let ID1 = useId();
  let ID2 = useId();
  let ID3 = useId();

  let currentUserID = useSelector((state) => state.auth.userData?.$id);
  let currentUserName = useSelector((state) => state.auth.userData?.name);
  let navigate = useNavigate()

  let { register,
        handleSubmit,
        formState : {errors}
      } = useForm({
        defaultValues : {
          Title : post?.Title || "",
          Content : post?.Content || "",
          UserID : post?.$id || ""
        }
      });

  async function handlePostSubmit(data) {
    if(post) {
      //Here logic of post update
    }
    else {
      let image = await PostsService.UploadFile(data.FeaturedImage[0]);
      if(image) {
        data.FeaturedImage = image.$id;
        let post = await PostsService.CreatePost({...data , UserID : currentUserID , UserName : currentUserName});
        navigate(`/Post/${post.$id}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handlePostSubmit)} className='p-5 mt-5'>
      <div className='flex flex-col justify-center gap-3'>
        <label htmlFor={ID1} className='font-bold text-3xl'>Title</label>
        <input type="text"
               id={ID1}
               {...register("Title",{
                required : "Title is Required!"
               })}
               className='border-none outline-2 outline-gray-800 w-[100%] py-2 px-5 rounded-2xl self-center'/>
        {errors.Title && <p className='text-red-500 text-center'>{errors.Title.message}</p>}
      </div>
      <div className='flex flex-col justify-center gap-3 mt-3'>
        <label htmlFor={ID2} className='font-bold text-3xl'>Content</label>
        <textarea id={ID2}
                  className='border-none outline-2 outline-gray-800 w-[100%] h-[33vh] p-3 rounded-2xl self-center resize-none'
                  {...register("Content",{
                    required : "Content is Required!"
                  })}
                  />
        {errors.Content && <p className='text-red-500 text-center'>{errors.Content.message}</p>}
      </div>
      <div className='mt-3 flex items-center gap-2'>
        <label htmlFor={ID3} className='font-bold text-2xl'>Upload Picture</label>
        <input type="file"
               id={ID3} 
               className='bg-gray-800 mt-1 px-1 w-50 text-white rounded-2xl cursor-pointer'
               {...register("FeaturedImage",{
                required : "Image is Required!"
               })}
               />
        {errors.FeaturedImage && <p className='text-red-500 text-center'>{errors.FeaturedImage.message}</p>}
      </div>
      <div className='flex items-center justify-end'>
        <button type='submit' className='bg-orange-600 text-white font-bold py-2 px-5 mt-3 text-2xl rounded-xl cursor-pointer hover:bg-white hover:text-orange-600 hover:outline-2 hover:outline-orange-600'>Post</button>
      </div>
    </form>
  )
}

export default PostForm