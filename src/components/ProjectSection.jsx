import React from 'react'
import ProjectSlideView from '../pages/Project/ProjectSlideView';

export default function ProjectSection({ 
  title, 
  projects, 
  currentSlide, 
  onSlideChange, 
  onProjectClick,
  onDelete, 
  isDeleting,
  itemsPerSlide = 3,
  emptyMessage,
  className = "",
  headerClassName = ""
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {title && (
        <div className={`w-[90%] mx-auto ${headerClassName}`}>
          <div className='w-fit my-5 px-4 py-1 rounded-2xl text-[12px] fontRegular bg-[#B1ED93] shadow-md'>
            {title}
          </div>
        </div>
      )}

      <div className="relative w-[90%] mx-auto">
        <ProjectSlideView
          projects={projects}
          currentSlide={currentSlide}
          onSlideChange={onSlideChange}
          onDelete={onDelete}
          onProjectClick={onProjectClick}
          isDeleting={isDeleting}
          itemsPerSlide={itemsPerSlide}
          emptyMessage={emptyMessage}
        />
      </div>
    </div>
  )
}