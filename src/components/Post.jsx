import React, { useState } from 'react'

const Post = () => {
  let [showFullPost,setShowFullPost] = useState(false);
  let [isAuthor,setIsAuthor] = useState(false);

  return (
    <>
      <div className='max-w-[30%] min-w-[330px] bg-gray-500 max-h-130 p-3 rounded-2xl'>
        <img src="https://images.pexels.com/photos/31682132/pexels-photo-31682132.jpeg" className='h-50 w-[100%] rounded-2xl'/>
        <p className='font-bold text mt-3 text-gray-800'>By <span className='text-black'>Name</span></p>
        <h1 className='font-bold text-3xl text-center text-black'>Title</h1>
        <p className='font-bold text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quas numquam molestias laudantium accusantium. Molestiae, nostrum ullam maxime repellat autem, aspernatur provident nulla quaerat sequi laboriosam iste sapiente sint animi.</p>
        <div className='flex justify-center items-center mt-3 gap-5'>
          {showFullPost && <button className='bg-green-500 py-2 px-5 text-xl font-bold rounded-xl cursor-pointer hover:outline-2 hover:outline-black hover:bg-gray-500'>Full Post</button>}
          {isAuthor && <button className='bg-orange-500 py-2 px-5 text-xl font-bold rounded-xl cursor-pointer hover:outline-2 hover:outline-black hover:bg-gray-500'>Edit</button>}
        </div>
      </div>
    </>
  )
}

export default Post