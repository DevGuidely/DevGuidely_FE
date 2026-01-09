import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'

export default function ProjectCreateModal({ isOpen, onClose }) {
  const [projectData, setProjectData] = useState({
    title: '',
    purpose: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // 여기에 프로젝트 생성 로직 추가
    console.log('새 프로젝트:', projectData)
    onClose()
    // 폼 초기화
    setProjectData({ title: '', purpose: '' })
  }

  const handleInputChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isFormValid = projectData.title.trim() !== '' && projectData.purpose.trim() !== ''

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-[#1E1E1E] bg-opacity-[85%]"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative bg-[#fff] rounded-2xl shadow-xl w-[700px] max-w-[90vw] max-h-[90vh] p-10 overflow-hidden">
        {/* 헤더 */}
        <div className="flex justify-center items-center pt-6">
          <div className="flex fontMedium text-[22px]">프로젝트 생성</div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* 프로젝트 제목 */}
            <div>
              <div className="fontRegular text-[#666666] text-[14px] mb-2">
                프로젝트 제목
              </div>
              <input
                type="text"
                value={projectData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Project Name"
                className="w-full px-4 py-3 border border-[#DFE7F4] rounded-xl fontRegular text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              />
            </div>

            {/* 프로젝트 목적 */}
            <div>
              <div className="fontRegular text-[#666666] text-[14px] mb-2">
                프로젝트 간단 설명
              </div>
              <textarea
                value={projectData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                placeholder="Project Description"
                rows={4}
                className="w-full px-4 py-3 border border-[#DFE7F4] rounded-xl fontRegular text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                required
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl fontRegular text-[14px] text-gray-700 hover:bg-gray-50 transition bg-white"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`
                flex-1 py-3 px-4 rounded-xl fontRegular text-[14px] transition
                ${isFormValid 
                  ? 'bg-project-create text-black hover:opacity-90 cursor-pointer' 
                  : 'bg-gray-200 text-black cursor-not-allowed'
                }
              `}
            >
              프로젝트 생성
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}