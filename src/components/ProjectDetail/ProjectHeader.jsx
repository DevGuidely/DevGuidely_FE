import React from 'react'

export default function ProjectHeader({ title, description, date }) {

  return (
    <div className='flex flex-col mt-5'>
      <div className='flex flex-col items-center'>
        <div className='flex fontBold text-[40px]'>
          {title}
        </div>
        <div className='flex fontRegular text-[16px]'>
          {description}
        </div>
      </div>
      
      <div className='flex justify-end mr-20'>
        <div className='flex fontLight text-[#363636] text-[14px]'>
          {date}
        </div>
      </div>
    </div>
  )
}