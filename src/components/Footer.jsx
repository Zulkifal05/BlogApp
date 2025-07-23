import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-800 font-bold text-white min-h-30 flex flex-col items-center p-3 mt-5'>
      <div>
        <p>Developed By <span className='text-lg text-orange-500'>Syed Zulkifal Ali Shah Bokhary</span></p>
        <p className='text-center'>Contact Me At</p>
      </div>
      <div className='flex gap-3 mt-1'>
        <a href="https://www.facebook.com/profile.php?id=100084611832311" target='_blank' rel="noopener noreferrer"
        ><img src="/public/Facebook.png" className='h-7 rounded-[50%]'/></a>
        <a href="https://www.instagram.com/zulkifal828/" target='_blank' rel="noopener noreferrer"><img src="/public/Instagram.png" className='h-7 rounded-[50%]'/></a>
        <a href="https://www.linkedin.com/in/syed-zulkifal-ali-shah-bokhary-514b76338/" target='_blank' rel="noopener noreferrer"><img src="/public/Linkedin.png" className='h-7'/></a>
      </div>
    </div>
  )
}

export default Footer