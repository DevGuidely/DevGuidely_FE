import React, { useState, useEffect } from 'react'
import MainNav from '../../components/MainNav'
import ProgressCategoryDropdown from '../../components/Button/ProgressCategoryDropdown'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useLocation } from 'react-router-dom'

export default function TechDetail() {
  const location = useLocation()
  
  const projectInfo = location.state?.projectInfo || {
    name: 'Unknown Project',
    description: 'No description available'
  }

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTechStack, setSelectedTechStack] = useState('')

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory)
    }
    if (location.state?.selectedTechStack) {
      setSelectedTechStack(location.state.selectedTechStack)
    }
  }, [location.state])

  const categories = [
    { id: 'backend', name: '백엔드', bgColor: '#13D199' },
    { id: 'frontend', name: '프론트엔드', bgColor: '#F68F4E' },
    { id: 'design', name: '디자인', bgColor: '#FF7E80' }
  ]

  const techStacks = {
    backend: ['Node.js', 'Spring Boot'],
    frontend: ['React', 'Vue'],
    design: []
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    setSelectedTechStack('')
  }

  const handleTechStackSelect = (tech) => {
    setSelectedTechStack(tech)
  }

  const renderContent = () => {
    if (!selectedCategory) {
      return (
        <div className='flex fontMedium text-[#666666] min-h-[450px] items-center'>
          파트를 선택해주세요
        </div>
      )
    }

    if (selectedCategory === 'design') {
      return (
        <div className='flex fontMedium text-[#666666] min-h-[450px] items-center'>
          아직 준비중입니다
        </div>
      )
    }

    return (
      <div className='w-full min-h-[450px] relative'>
        <div className='flex items-center gap-4 mb-6'>
          <h3 className='text-[20px] fontMedium text-[#333333]'>기술 선택</h3>
          <div className='flex gap-3'>
            {techStacks[selectedCategory]?.map((tech) => (
              <button
                key={tech}
                onClick={() => handleTechStackSelect(tech)}
                className={`
                  z-50 px-4 py-1 rounded-full fontMedium transition-all duration-200
                  ${selectedTechStack === tech
                    ? 'bg-[#EFF5FF] text-[#333333]'
                    : 'border border-[#D7DCE5] text-[#5C667B] hover:border-gray-400'
                  }
                `}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
        
        {selectedTechStack ? (
          <div className='mx-5 mt-8'>
            <div className='text-[18px] fontMedium text-[#333333] mb-4'>
              {selectedTechStack} 개발 환경 설정
            </div>
            <div className='p-4 bg-[#F8F9FA] rounded-lg'>
              <p className='text-[#666666]'>
                {selectedTechStack}를 사용한 프로젝트 설정을 시작합니다.
              </p>
            </div>
          </div>
        ) : (
          <div className='absolute inset-0 z-0 flex items-center justify-center'>
            <div className='fontMedium text-[#666666]'>
              기술 스택을 선택해주세요
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col mb-10">
      <MainNav />

      <ProjectHeader projectName={projectInfo.name} />

      <div className="flex justify-center mt-5">
        <div className="flex gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`
                px-5 py-1 rounded-full fontMedium transition-all duration-200
                ${selectedCategory === category.id
                  ? `text-[#FFFFFF]`
                  : 'bg-[#F5F5F5] text-[#666666] hover:bg-gray-200'
                }
              `}
              style={{
                backgroundColor: selectedCategory === category.id ? category.bgColor : '#F5F5F5'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className='flex justify-center bg-[#fff] mt-10 rounded-3xl shadow-xl mx-20 p-6'>
        {renderContent()}
      </div>
    </div>
  )
}

const ProjectHeader = ({ projectName }) => (
  <div className="flex items-center justify-between px-24 mt-5">
    <div className="flex items-center">
      <div className="flex bg-[#FDD7D8] w-10 h-10 rounded-md"></div>
      <div className="flex flex-col ml-4">
        <div className="flex fontBold text-[28px]">Tech</div>
        <div className="flex fontRegular text-[14px]">
          {projectName}
        </div>
      </div>
    </div>
    <ProgressCategoryDropdown />
  </div>
)