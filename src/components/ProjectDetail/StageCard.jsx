import React from 'react'

export default function StageCard({ stage, onClick }) {
  return (
    <div 
      onClick={() => onClick?.(stage)}
      className={`flex flex-col ${stage.bgColor} p-6 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow`}
    >
      <div className='flex text-[#000000] text-[20px] fontRegular mb-20'>
        {stage.title}
      </div>
      <div className='flex text-[#464646] text-[14px] fontRegular'>
        {stage.description}
      </div>
    </div>
  )
}