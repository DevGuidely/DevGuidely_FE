import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { AiOutlineEdit } from "react-icons/ai";

const progressLabelMap = {
  before: '진행 전',
  doing: '진행 중',
  done: '진행 완료',
  unused: '미사용',
}

const progressColorMap = {
  before: 'bg-progress-before',
  doing: 'bg-progress-ing',
  done: 'bg-progress-done',
  unused: 'bg-progress-unused',
}

export default function ProjectCard({ project, onProjectClick, onDelete, onEdit, isDeleting = false }) {
  const handleCardClick = () => {
    if (isDeleting) {
      return
    }
    
    if (onProjectClick) {
      onProjectClick(project.id)
    } else {
      console.log(' onProjectClick이 없음!')
    }
  }

  return (
    <div 
      className={`relative px-6 py-6 transition rounded-2xl bg-project-bg hover:shadow-md ${
        isDeleting ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={handleCardClick}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className='flex items-center gap-2'>
            <div className="fontSB text-[16px]">{project.title}</div>
            <AiOutlineEdit
              className={`text-[18px] transition-colors ${
                isDeleting
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[#838383] hover:text-[#000] cursor-pointer'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                if (!isDeleting && onEdit) {
                  onEdit(project)
                }
              }}
            />
          </div>
          
          <MdDeleteOutline 
            className={`text-[20px] transition-colors ${
              isDeleting 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-[#838383] hover:text-red-500 cursor-pointer'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isDeleting) {
                onDelete(project.id, project.title);
              }
            }}
            title={isDeleting ? '삭제 중...' : '프로젝트 삭제'}
          />
        </div>
        
        <div className="fontRegular text-[13px] text-project-desc mt-1">
          {project.purpose || project.description}
        </div>
        
        <div className="flex items-center justify-between mt-16">
          <div className="text-[12px] text-project-date">
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
          <div
            className={`
              w-fit h-fit text-[12px] fontRegular px-4 py-1 rounded-2xl
              ${progressColorMap[project.progress] || 'bg-gray-200'}
            `}
          >
            {progressLabelMap[project.progress] || project.progress}
          </div>
        </div>
      </div>
      
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-2xl">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-400 rounded-full border-t-transparent animate-spin"></div>
            <span className="text-sm text-gray-600 fontRegular">삭제 중...</span>
          </div>
        </div>
      )}
    </div>
  )
}