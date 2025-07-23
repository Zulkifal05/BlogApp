import React, { useId , useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import PostsService from '../services/Posts'
import { useNavigate } from 'react-router-dom'
import { removePosts } from "../store/PostsSlice"

const PostForm = ({post}) => {
  let ID1 = useId();
  let ID2 = useId();
  let ID3 = useId();
  let dispatch = useDispatch();

  let [previousImgURL,setPreviousImgURL] = useState("#");
  let currentUserID = useSelector((state) => state.auth.userData?.$id);
  let currentUserName = useSelector((state) => state.auth.userData?.name);
  let navigate = useNavigate()

  let { register , handleSubmit , formState : {errors} , reset } = useForm({
        defaultValues : {
          Title : post?.Title || "",
          Content : post?.Content || ""
        }
      });

  //For post values if they arrive late
  useEffect(() => {
    if (post) {
      reset({
        Title: post.Title,
        Content: post.Content
      });

      if (post.FeaturedImage) {
        const fileUrl = PostsService.FilePreview(post.FeaturedImage);
        setPreviousImgURL(fileUrl);
      }
    }
  }, [ post , reset ]);

  async function DeletePost() {
    let response = await PostsService.DeleteFile(post.FeaturedImage);
    if(response) {
      let resp = await PostsService.DeletePost(post.$id);
      if(resp) {
        navigate("/")
      }
    }
  }

  async function handlePostSubmit(data) {
    if(post) {
      //Here logic of post update
      let updateImg = data.FeaturedImage[0] ? await PostsService.UploadFile(data.FeaturedImage[0]) : null;

      if(updateImg) {
        await PostsService.DeleteFile(post.FeaturedImage);
      }

      let updateResponse = await PostsService.UpdatePost(post.$id,{...data , FeaturedImage : updateImg ? updateImg.$id : post.FeaturedImage});

      if(updateResponse) {
        dispatch(removePosts());
        navigate(`/Post/${updateResponse.$id}`, { state : { post : updateResponse} })
      }
    }
    else {
      //Here logic of post creation
      let image = await PostsService.UploadFile(data.FeaturedImage[0]);

      if(image) {
        data.FeaturedImage = image.$id;
        let createdPost = await PostsService.CreatePost({...data , UserID : currentUserID , UserName : currentUserName});

        if(createdPost) {
          dispatch(removePosts());
          navigate(`/Post/${createdPost.$id}` , { state : { post : createdPost } })
        }
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
        <label htmlFor={ID3} className='font-bold text-2xl'>{post ? "Upload New Picture" : "Upload Picture"}</label>
        <input type="file"
               id={ID3} 
               accept="image/png, image/jpg, image/jpeg, image/gif"
               className='bg-gray-800 mt-1 px-1 w-50 text-white rounded-2xl cursor-pointer'
               {...register("FeaturedImage",{
                required : {
                  value : !post,
                  message : "Image is Required"
                }
               })}
               />
        {errors.FeaturedImage && <p className='text-red-500 text-center'>{errors.FeaturedImage.message}</p>}
      </div>
      {post && <div className='p-3'>
          <img src={previousImgURL} alt="Preivous Image" className='h-50 rounded-xl'/>
        </div>}
      <div className={`flex items-center ${post ? "justify-between" : "justify-end"}`}>
        {post && <button onClick={DeletePost} className='bg-red-700 text-white font-bold py-2 px-5 mt-3 text-2xl rounded-xl cursor-pointer hover:bg-white hover:text-red-700 hover:outline-2 hover:outline-red-700'>Delete Post</button>}
        <button type='submit' className='bg-orange-600 text-white font-bold py-2 px-5 mt-3 text-2xl rounded-xl cursor-pointer hover:bg-white hover:text-orange-600 hover:outline-2 hover:outline-orange-600'>{post ? "Update" : "Post"}</button>
      </div>
    </form>
  )
}

export default PostForm