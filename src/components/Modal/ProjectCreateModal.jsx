import React, { useState } from 'react'
import { createProjectApi } from '../../api/project.api.js'

export default function ProjectCreateModal({ isOpen, onClose, onCreate }) {
  const [projectData, setProjectData] = useState({
    title: '',
    purpose: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return

    try {
      setIsLoading(true)

      const response = await createProjectApi(projectData)

      /**
       * ✔️ 성공 판단 기준
       * - 여기까지 왔다는 것은 axios 에러 / throw 가 없었다는 뜻
       * - 즉, 서버는 정상 처리
       */
      const createdProject =
        response?.data?.project ??
        response?.data ??
        null

      // 👉 생성 객체가 없어도 성공으로 처리
      if (createdProject) {
        onCreate(createdProject)
      } else {
        // 생성 데이터가 없으면 부모에서 재조회하도록 신호만 줌
        onCreate(null)
      }

      setProjectData({ title: '', purpose: '' })
      onClose()

    } catch (err) {
      console.error('❌ 프로젝트 생성 API 에러:', err)
      alert('프로젝트 생성에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const isFormValid =
    projectData.title.trim() !== '' &&
    projectData.purpose.trim() !== ''

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-[#1E1E1E] bg-opacity-[85%]"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-2xl shadow-xl w-[700px] max-w-[90vw] p-10">
        {/* 헤더 */}
        <div className="flex justify-center pt-6">
          <div className="fontMedium text-[22px]">프로젝트 생성</div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <div className="fontRegular text-[#666] text-[14px] mb-2">
              프로젝트 제목
            </div>
            <input
              type="text"
              value={projectData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Project Name"
              disabled={isLoading}
              className="w-full px-4 py-3 border rounded-xl text-[14px]"
              required
            />
          </div>

          <div>
            <div className="fontRegular text-[#666] text-[14px] mb-2">
              프로젝트 간단 설명
            </div>
            <textarea
              value={projectData.purpose}
              onChange={(e) => handleInputChange('purpose', e.target.value)}
              placeholder="Project Description"
              rows={4}
              disabled={isLoading}
              className="w-full px-4 py-3 border rounded-xl text-[14px] resize-none"
              required
            />
          </div>

          <div className="flex mt-6 space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 border rounded-xl text-[14px]"
            >
              취소
            </button>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`flex-1 py-3 rounded-xl text-[14px]
                ${isFormValid && !isLoading
                  ? 'bg-project-create hover:opacity-90'
                  : 'bg-gray-200 cursor-not-allowed'
                }`}
            >
              {isLoading ? '생성 중...' : '프로젝트 생성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
