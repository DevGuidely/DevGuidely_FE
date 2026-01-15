import React from 'react'
import ProjectCard from './ProjectCard'

const chunkArray = (array, size) => {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export default function ProjectSlideView({ 
  projects, 
  currentSlide, 
  onSlideChange, 
  onProjectClick,
  onDelete, 
  isDeleting, 
  itemsPerSlide = 3,
  emptyMessage = '프로젝트가 없습니다.' 
}) {
  const slides = chunkArray(projects, itemsPerSlide)

  if (projects.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16'>
        <div className='text-gray-500 text-[16px] fontRegular'>
          {emptyMessage}
        </div>
      </div>
    )
  }

  if (itemsPerSlide >= projects.length) {
    return (
      <div className={`grid gap-4 ${itemsPerSlide === 3 ? 'grid-cols-3' : 'grid-cols-3'}`}>
        {projects.map((project) => (
          <div key={`project-${project.id}`} className="relative">
            <ProjectCard 
              project={project}
              onProjectClick={onProjectClick}
              onDelete={onDelete}
              isDeleting={isDeleting === project.id}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      {/* 슬라이드 영역 */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((group, slideIndex) => (
            <div 
              key={`slide-${slideIndex}`} 
              className={`flex-shrink-0 w-full grid gap-4 ${
                itemsPerSlide === 3 ? 'grid-cols-3' : 'grid-cols-3'
              }`}
            >
              {group.map((project) => (
                <div key={`project-${project.id}`} className="relative">
                  <ProjectCard 
                    project={project}
                    onProjectClick={onProjectClick}
                    onDelete={onDelete}
                    isDeleting={isDeleting === project.id}
                  />
                </div>
              ))}
              
              {group.length < itemsPerSlide && Array.from({ length: itemsPerSlide - group.length }, (_, idx) => (
                <div key={`slide-${slideIndex}-empty-${idx}`} className="invisible" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="flex justify-center mt-5 mb-4 space-x-2">
          {slides.map((_, index) => (
            <div
              key={`dot-${index}`}
              onClick={() => onSlideChange(index)}
              className={`
                w-[8px] h-[8px] rounded-full cursor-pointer
                ${currentSlide === index ? 'bg-project-dot-active' : 'bg-project-dot-inactive'}
              `}
            />
          ))}
        </div>
      )}
    </>
  )
}